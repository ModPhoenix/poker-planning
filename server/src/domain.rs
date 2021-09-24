pub struct User {
    pub id: i32,
    pub username: String,
}

pub struct Room {
    pub id: i32,
    pub name: String,
    pub users: Vec<User>,
    pub deck: Deck,
}

pub struct Deck {
    pub id: i32,
    pub kind: String,
}
