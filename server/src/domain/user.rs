use async_graphql::SimpleObject;
use uuid::Uuid;

use crate::types::EntityId;

#[derive(Clone, Debug, SimpleObject)]

pub struct User {
    pub id: EntityId,
    pub username: Option<String>,
}

impl User {
    pub fn new(username: Option<String>) -> Self {
        User {
            id: Uuid::new_v4(),
            username,
        }
    }
}
