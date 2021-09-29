use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

use uuid::Uuid;

use crate::domain::Room;

pub type EntityId = Uuid;
pub type Card = String;

pub type Storage = Arc<Mutex<HashMap<EntityId, Room>>>;
