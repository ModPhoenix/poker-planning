use crate::{
    domain::{
        game::UserCard,
        room::Room,
        user::{User, UserInput},
    },
    simple_broker::SimpleBroker,
    types::{EntityId, Storage},
};
use async_graphql::*;
use futures::{Stream, StreamExt};
use std::iter::Iterator;

pub type PokerPlanningSchema = Schema<QueryRoot, MutationRoot, SubscriptionRoot>;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn rooms(&self, ctx: &Context<'_>) -> Vec<Room> {
        let storage = ctx.data_unchecked::<Storage>().lock().unwrap();

        storage.clone().into_iter().map(|(_, room)| room).collect()
    }
}

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn create_room(&self, ctx: &Context<'_>, name: Option<String>) -> Room {
        let mut storage = ctx.data_unchecked::<Storage>().lock().unwrap();
        let room = Room::new(name);

        storage.insert(room.id.clone(), room.clone());

        SimpleBroker::publish(room.clone());

        room
    }

    async fn create_user(&self, username: String) -> User {
        User::new(username)
    }

    async fn join_room(
        &self,
        ctx: &Context<'_>,
        room_id: EntityId,
        user: UserInput,
    ) -> Option<Room> {
        let mut storage = ctx.data_unchecked::<Storage>().lock().unwrap();

        match storage.get_mut(&room_id) {
            Some(room) => {
                if !room.users.iter().any(|u| u.id == user.id) {
                    room.users.push(user.into());

                    SimpleBroker::publish(room.clone());

                    Some(room.clone())
                } else {
                    SimpleBroker::publish(room.clone());

                    Some(room.clone())
                }
            }
            None => None,
        }
    }

    async fn pick_card(
        &self,
        ctx: &Context<'_>,
        user_id: EntityId,
        room_id: EntityId,
        card: String,
    ) -> Result<Room> {
        let mut storage = ctx.data_unchecked::<Storage>().lock()?;

        let room = storage.get_mut(&room_id).unwrap();

        let mut table: Vec<UserCard> = room
            .game
            .table
            .clone()
            .into_iter()
            .filter(|u| u.user_id != user_id)
            .collect();

        table.push(UserCard::new(user_id, card));

        room.game.table = table.clone();

        SimpleBroker::publish(room.clone());

        Ok(room.clone())
    }
}

pub struct SubscriptionRoot;

#[Subscription]
impl SubscriptionRoot {
    async fn room(&self, room_id: EntityId) -> impl Stream<Item = Room> {
        SimpleBroker::<Room>::subscribe().filter(move |event| {
            let is_current_room = room_id == event.id;

            async move { is_current_room }
        })
    }
}
