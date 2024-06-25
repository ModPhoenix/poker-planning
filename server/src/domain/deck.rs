use async_graphql::SimpleObject;
use uuid::Uuid;

use crate::types::{Card, EntityId};

#[derive(Clone, Debug, SimpleObject)]
pub struct Deck {
    pub id: EntityId,
    pub cards: Vec<Card>,
}

impl Deck {
    pub fn new() -> Self {
        Deck {
            id: Uuid::new_v4(),
            cards: vec![
                "XS|Low 1 - 1.1".to_string(),
                "XS|Med 1 - 1.5".to_string(),
                "XS|High 1 - 2".to_string(),
                "XS|Ex 1 - 5".to_string(),
                "S|Low 2 - 2.2".to_string(),
                "S|Med 2 - 3".to_string(),
                "S|High 2 - 4".to_string(),
                "S|Ex 2 - 10".to_string(),
                "M|Low 3 - 3.3".to_string(),
                "M|Med 3 - 4.5".to_string(),
                "M|High 3 - 6".to_string(),
                "M|Ex 3 - 15".to_string(),
                "L|Low 5 - 5.5".to_string(),
                "L|Med 5 - 7.5".to_string(),
                "L|High 5 - 10".to_string(),
                "L|Ex 5 - 25".to_string(),
                "XL|Low 10 - 11".to_string(),
                "XL|Med 10 - 15".to_string(),
                "XL|High 10 - 20".to_string(),
                "XL|Ex 10 - 50".to_string(),
            ],
        }
    }
}
