use crate::{
    domain::{Room, User},
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

    async fn create_user(
        &self,
        ctx: &Context<'_>,
        username: String,
        room_id: Option<EntityId>,
    ) -> User {
        let mut storage = ctx.data_unchecked::<Storage>().lock().unwrap();
        let user = User::new(Some(username));

        match room_id {
            Some(room_id) => match storage.get_mut(&room_id) {
                Some(room) => {
                    room.users.push(user.clone());

                    SimpleBroker::publish(room.clone());
                }
                None => {}
            },
            None => {}
        }

        user
    }
}

pub struct SubscriptionRoot;

#[Subscription]
impl SubscriptionRoot {
    async fn room(&self, room_id: EntityId) -> impl Stream<Item = Room> {
        SimpleBroker::<Room>::subscribe().filter(move |event| {
            let res = room_id == event.id;

            async move { res }
        })
    }
}
