FROM lukemathwalker/cargo-chef:latest-rust-latest as chef
WORKDIR /app

FROM chef as planner
COPY . .
# Compute a lock-like file for our project
RUN cargo chef prepare  --recipe-path recipe.json

FROM chef as builder
COPY --from=planner /app/recipe.json recipe.json
# Build our project dependencies, not our application!
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .
# Build our project
RUN cargo build --release --bin poker-planning

FROM debian:bullseye-slim AS runtime
WORKDIR /app
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  # Clean up
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/poker-planning poker-planning
COPY /configuration configuration
ENV APP_ENVIRONMENT production
ENTRYPOINT ["./poker-planning"]