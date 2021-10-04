use async_graphql::{async_stream, Context, Object, Schema, Subscription};
use futures::Stream;
use std::time::Duration;

use crate::{
    domain::{Room, User},
    types::{EntityId, Storage},
};

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
    async fn interval(&self, #[graphql(default = 1)] n: i32) -> impl Stream<Item = i32> {
        let mut value = 0;
        async_stream::stream! {
            loop {
                futures_timer::Delay::new(Duration::from_secs(1)).await;
                value += n;
                yield value;
            }
        }
    }
}
