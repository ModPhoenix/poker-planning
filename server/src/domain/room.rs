use async_graphql::SimpleObject;
use uuid::Uuid;

use crate::types::EntityId;

use super::{deck::Deck, game::Game, user::User};

#[derive(Clone, Debug, SimpleObject)]
pub struct Room {
    pub id: EntityId,
    pub name: Option<String>,
    pub users: Vec<User>,
    pub deck: Deck,
    pub game: Game,
}

impl Room {
    pub fn new(name: Option<String>) -> Self {
        Room {
            id: Uuid::new_v4(),
            name,
            users: vec![],
            deck: Deck::new(),
            game: Game::new(),
        }
    }
}
