![Alice Logo](https://github.com/aliceservices/alice/blob/master/alice-logo.jpg?raw=true)
# <span>Alice 👩</span> [![GitHub release](https://img.shields.io/github/release/aghoneim92/alice.svg)]()

[![Coverage](https://coveralls.io/repos/github/aghoneim92/os.js/badge.svg?branch=master)](https://coveralls.io/github/aghoneim92/os.js?branch=master)


Alice is an free and open-source (FOSS) Operating System running in your browser.


## Features

- [x] GBA Emulator
- [x] Web Terminal
- [x] Hextrix Puzzle Game
- [x] Time & Date
- [x] Camera Snap&Pop

## Getting Started

### Development
## Requirements

1. NodeJS >=v7.6 (necessary for async/await support) with npm or preferably [yarn](https://yarnpkg.com/en/docs/install)
1. A self-signed ssl certificate configured as trusted locally. Check out [this](https://certsimple.com/blog/localhost-ssl-fix) guide if you're using macOS, and [this](http://unix.stackexchange.com/questions/90450/adding-a-self-signed-certificate-to-the-trusted-list) guide if you're on Debian/Ubuntu.
> Store your certificate pair under ./alice-keys/alice.crt and ./alice-keys/alice.key
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

go to [https://localhost:4001](https://localhost:4001)
