use async_graphql::SimpleObject;
use uuid::Uuid;

use crate::types::{Card, EntityId};

#[derive(Clone, Debug, SimpleObject)]
pub struct Game {
    pub id: EntityId,
    pub table: Vec<UserCard>,
}

#[derive(Clone, Debug, SimpleObject)]
pub struct UserCard {
    pub id: EntityId,
    pub user_id: i32,
    pub card: Card,
}

impl Game {
    pub fn new() -> Self {
        Game {
            id: Uuid::new_v4(),
            table: vec![],
        }
    }
}
