use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

use crate::{
    configuration::get_configuration,
    handlers::{health_check, index, index_playground, index_ws},
    schema::{MutationRoot, QueryRoot, SubscriptionRoot},
    types::Storage,
};

use actix_web::{guard, middleware, web, App, HttpServer};
use async_graphql::Schema;

mod configuration;
mod domain;
mod handlers;
mod schema;
mod simple_broker;
mod types;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Hello, world! This is the pokerplanning.org");
    env_logger::init();

    let settings = get_configuration().expect("Failed to read settings.");
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
            .service(
                web::resource("/health_check")
                    .guard(guard::Get())
                    .to(health_check),
            )
    })
    .bind(server_address)?
    .run()
    .await
}
