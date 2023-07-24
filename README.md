# PokerPlanning.org 🃏

The main mission of this project is to make **online planning poker** super easy and enjoyable 🥰. And also free to use for people from all over the world 🌍🌎🌏!

Mono repository for scrum poker tool [PokerPlanning.org](https://pokerplanning.org/)

## Fancy technologies 🌈

- Server 🚀
  - Rust 🦀
  - async-graphql 😱
- Client 🦄
  - TypeScript 😻
  - React ⚛️
  - apollo-client 🤌
  - material-ui 😎

## Getting Started 🛠

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
npm run dev
```

### Digitalocean CLI

```sh
doctl auth init
doctl apps create --spec spec.yaml
doctl apps list
doctl apps update APP-ID --spec=spec.yaml
```
