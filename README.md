# Remix modern UI tutorial

Hey there 👋

This repo contains the code for my tutorial on building modern UIs with [Remix](https://remix.run).
As Remix focuses on web standards, these concepts should be applicable to any modern web framework,
regardless of the framework you would use.

If you're interested in the tech stack of this repository, have a look at
[the decision log](docs/decisions).

## Getting started

### Pre-requisites

The only pre-requisite to get started is to have Node.js (LTS) installed on your machine. This can
be done manually or through a version manager like [asdf](https://asdf-vm.com/).

### Development

- Initial setup:

```sh
npm run setup
```

This will build the application, create your database file and run the migrations

- Start dev server:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.
