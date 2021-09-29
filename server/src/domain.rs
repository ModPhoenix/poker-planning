use async_graphql::*;
use uuid::Uuid;

use crate::types::{Card, EntityId};

#[derive(Clone, Debug, SimpleObject)]

pub struct User {
    pub id: EntityId,
    pub username: Option<String>,
}

#[derive(Clone, Debug, SimpleObject)]
pub struct Room {
    pub id: EntityId,
    pub name: Option<String>,
    pub users: Vec<User>,
    pub deck: Deck,
    pub game: Game,
}

#[derive(Clone, Debug, SimpleObject)]
pub struct Deck {
    pub id: EntityId,
    pub cards: Vec<Card>,
}

#[derive(Clone, Debug, SimpleObject)]
pub struct UserCard {
    pub id: EntityId,
    pub user_id: i32,
    pub card: Card,
}

#[derive(Clone, Debug, SimpleObject)]
pub struct Game {
    pub id: EntityId,
    pub table: Vec<UserCard>,
}

impl User {
    pub fn new(username: Option<String>) -> Self {
        User {
            id: Uuid::new_v4(),
            username,
        }
    }
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

impl Game {
    pub fn new() -> Self {
        Game {
            id: Uuid::new_v4(),
            table: vec![],
        }
    }
}

impl Deck {
    fn new() -> Self {
        Deck {
            id: Uuid::new_v4(),
            cards: vec![
                "0".into(),
                "1".into(),
                "2".into(),
                "3".into(),
                "5".into(),
                "8".into(),
                "13".into(),
                "21".into(),
                "34".into(),
                "55".into(),
                "89".into(),
                "∞".into(),
                "?".into(),
                "☕".into(),
            ],
        }
    }
}
