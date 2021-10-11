use async_graphql::{InputObject, SimpleObject};
use uuid::Uuid;

use crate::types::EntityId;

#[derive(Clone, Debug, InputObject)]

pub struct UserInput {
    pub id: EntityId,
    pub username: String,
}

#[derive(Clone, Debug, SimpleObject)]

pub struct User {
    pub id: EntityId,
    pub username: String,
}

impl User {
    pub fn new(username: String) -> Self {
        User {
            id: Uuid::new_v4(),
            username,
        }
    }
}

impl From<UserInput> for User {
    fn from(input: UserInput) -> Self {
        User {
            id: input.id,
            username: input.username,
        }
    }
}
