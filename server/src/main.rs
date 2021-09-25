use crate::settings::get_settings;

mod domain;
mod settings;

fn main() -> std::io::Result<()> {
    let settings = get_settings().expect("Failed to read settings.");

    println!("Hello, world! This is the pokerplanning.org");
    println!("Server address: {}", settings.get_server_address());

    Ok(())
}
