![Alice Logo](https://raw.githubusercontent.com/aliceservices/alice/master/src/logo.png)
# <span>Alice 👩</span> [![GitHub release](https://img.shields.io/github/release/aghoneim92/alice.svg)]()

[![Coverage](https://coveralls.io/repos/github/aghoneim92/os.js/badge.svg?branch=master)](https://coveralls.io/github/aghoneim92/os.js?branch=master)

Alice is an free and open-source (FOSS) Operating System running in your browser.

## Features
- Typescript
- React
- Apps:
- GBA Emulator
- [Hextris](https://github.com/Hextris/hextris)
- Camera

## Getting Started

### Development
## Requirements

1. NodeJS >=v7.6 (necessary for async/await support) with npm or preferably [yarn](https://yarnpkg.com/en/docs/install)
2. Your own firebase app with firebase admin enabled, and a firebase private key
> Store your firebase admin certificate under ./alice-keys/{key-filename}.json
* Add the following to your .bashrc, .bash_profile, or .zshrc:

```bash
export FIREBASE_ADMIN_KEY_FILENAME = {key-filename}
```

* Start a new terminal, or `source ~/.bashrc`

```bash
yarn
npm start
# Need to manually run tis in a separate tab if not using macOS.
npm run start-server
```

go to [http://localhost:8080](http://localhost:8080)
