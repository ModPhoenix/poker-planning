use config::ConfigError;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Settings {
    pub host: String,
    pub port: u16,
}

pub fn get_settings() -> Result<Settings, ConfigError> {
    // Initialize our settings reader
    let mut settings = config::Config::default();

    // Add configuration values from a file named `settings`.
    // It will look for any top-level file with an extension
    // that `config` knows how to parse: yaml, json, etc.
    settings.merge(config::File::with_name("settings"))?;

    // Try to convert the configuration values it read into
    // our Settings type
    settings.try_into()
}

impl Settings {
    pub fn get_server_address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}
