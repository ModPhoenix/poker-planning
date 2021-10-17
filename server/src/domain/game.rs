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
    pub user_id: EntityId,
    pub card: Option<Card>,
}

impl Game {
    pub fn new() -> Self {
        Game {
            id: Uuid::new_v4(),
            table: vec![],
        }
    }
}

impl UserCard {
    pub fn new(user_id: EntityId, card: Card) -> Self {
        UserCard {
            user_id,
            card: Some(card),
        }
    }
}
