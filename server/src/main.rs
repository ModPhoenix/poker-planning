use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

use crate::{
    handlers::{index, index_playground, index_ws},
    schema::{MutationRoot, QueryRoot, SubscriptionRoot},
    settings::get_settings,
    types::Storage,
};

use actix_web::{guard, middleware, web, App, HttpServer};
use async_graphql::Schema;

mod domain;
mod handlers;
mod schema;
mod settings;
mod types;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Hello, world! This is the pokerplanning.org");
    env_logger::init();

    let settings = get_settings().expect("Failed to read settings.");
    let server_address = settings.get_server_address();

    let storage: Storage = Arc::new(Mutex::new(HashMap::new()));

    let schema = Schema::build(QueryRoot, MutationRoot, SubscriptionRoot)
        .data(storage.clone())
        .finish();

    println!("Playground: http://{}", server_address);

    HttpServer::new(move || {
        App::new()
            .data(schema.clone())
            .wrap(middleware::Logger::default())
            .service(web::resource("/").guard(guard::Post()).to(index))
            .service(
                web::resource("/")
                    .guard(guard::Get())
                    .guard(guard::Header("upgrade", "websocket"))
                    .to(index_ws),
            )
            .service(web::resource("/").guard(guard::Get()).to(index_playground))
    })
    .bind(server_address)?
    .run()
    .await
}
