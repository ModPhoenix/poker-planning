use async_graphql::{async_stream, EmptyMutation, Object, Schema, Subscription};
use futures::Stream;
use std::time::Duration;

pub type PokerPlanningSchema = Schema<QueryRoot, EmptyMutation, SubscriptionRoot>;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn books(&self) -> String {
        "test".into()
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
