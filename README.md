# KA Web

Web client for the up-and-coming community edition of The Lacuna Expanse, known as "Kenó Antigen".

[![CircleCI Build Status](https://circleci.com/gh/Kantigen/ka-web/tree/master.svg?style=svg)](https://circleci.com/gh/Kantigen/ka-web/tree/master)

[![Kenó Antigen screenshot](docs/img/screenshot.png)](https://demo.kenoantigen.com/)

# Setup

Requires Node and npm:

```bash
git clone https://github.com/Kantigen/ka-web
cd ka-web
git submodule update --init --recursive
npm install
```

# Running

The client has two run modes for local development:

**`npm run dev`**: assumes you have [ka-server](https://github.com/Kantigen/ka-server) set up and running.

**`npm run dev:stubbed`**: uses a stubbed game server instead

# Ideas

Got an idea? [Let us know!](https://github.com/Kantigen/ka-web/issues)

[![Yoda and feature requests](docs/img/feature-request.jpg)](https://github.com/Kantigen/ka-web/issues)

# Hacking

If you're interested in hacking on the client, hit up the [developer's documentation](docs/README.md).

# License

See the [LICENSE](LICENSE) file.
