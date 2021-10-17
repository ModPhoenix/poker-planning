use async_graphql::SimpleObject;
use uuid::Uuid;

use crate::types::EntityId;

use super::{
    deck::Deck,
    game::{Game, UserCard},
    user::User,
};

#[derive(Clone, Debug, SimpleObject)]
pub struct Room {
    pub id: EntityId,
    pub name: Option<String>,
    pub users: Vec<User>,
    pub deck: Deck,
    pub game: Game,
    pub is_revealed: bool,
}

impl Room {
    pub fn new(name: Option<String>) -> Self {
        Room {
            id: Uuid::new_v4(),
            name,
            users: vec![],
            deck: Deck::new(),
            game: Game::new(),
            is_revealed: false,
        }
    }

    pub fn get_room(&self) -> Room {
        if self.is_revealed {
            self.clone()
        } else {
            let table: Vec<UserCard> = self
                .clone()
                .game
                .table
                .iter()
                .map(|user_card| UserCard {
                    user_id: user_card.user_id,
                    card: None,
                })
                .collect();

            Room {
                game: Game {
                    table,
                    ..self.game.clone()
                },
                ..self.clone()
            }
        }
    }
}
