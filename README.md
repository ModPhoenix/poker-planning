# PokerPlanning.org

Mono repository for scrum poker tool [pokerplanning.org](https://pokerplanning.org/)

## Getting Started

### Setup environment

```sh
git clone https://github.com/ModPhoenix/poker-planning.git
cd poker-planning

cargo install cargo-watch
```

### Run dev server

```sh
cd server
cargo watch -x run
```

### Run web app

```sh
cd client
cp .env.local.example .env.local
npm i
npm start
```
