# NFT Marketplace

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10.0-blue.svg)

### A Non-Fungible Tokens based decentralised marketplace to bid and purchase collectibles on a P2P public network.

[Documentation](https://ipfs.io/ipfs/QmPfzu71BNh8v7eE12NC4tmo7rgcYJuNzQm2zaRe1LD8J3)

## Setup
- `yarn`

## Run local node, compile & migrate (Deploy) Contracts
- `yarn deploy` (Default network: local Hardhat development network)

![](https://media.giphy.com/media/9l6z9MzXfHX9gKzbvU/giphy.gif)

```text
It runs up a Hardhat node, compile contracts, generates typescript interfaces, creates React context and instantiates your contract instances and factories with frontend provider.
```

## Start the DApp User Interface

- Open up a new terminal
- Enter the frontend directory: `cd frontend`
- Install dependencies: `yarn`
- Import seed phrase in Metamask. The default mnemonic currently used by hardhat is `test test test test test test test test test test test junk`
- Ensure Metamask RPC is set to `http://localhost:8545` and chainID `31337`.
- Start the React app `yarn start` [localhost:3000](http://localhost:3000)

[![Image from Gyazo](https://i.gyazo.com/0617fdc892b1c60ab8209e2ef53666d1.gif)](https://gyazo.com/0617fdc892b1c60ab8209e2ef53666d1)

Because of the default hardhat.config.ts it will first try to connect with an injected provider like Metamask (web3modal package does this).

If nothing found it will try to connect with your hardhat node. On localhost and hardhat nodes it will inject your mnemonic into the frontend so you have a "browser wallet" that can both call and send transactions. NB! Dont ever put a mnemonic with actual value here.

In hardhat.config.ts there is example on how to instruct your hardhat-network to use mnemonic or privatekey.

```ts
const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
};
```

Ensure you are using RPC to http://localhost:8545.

You may also need to set the chainID to 31337 if you are using Hardhat blockchain development node.

## Invalid nonce.

```bash
eth_sendRawTransaction
  Invalid nonce. Expected X but got X.
```

Reset your account in Metamask.

# We ❤️ these **Ethereum** projects:

- [Hardhat 👷](https://hardhat.org/)
- [Hardhat-deploy 🤘](https://hardhat.org/plugins/hardhat-deploy.html)
- [Typechain 🔌](https://github.com/ethereum-ts/Typechain#readme)
- [hardhat-typechain 🧙‍♀️](https://hardhat.org/plugins/hardhat-typechain.html)
- [ethers.js v5 ⺦](https://github.com/ethers-io/ethers.js#readme)
- [web3modal 💸](https://github.com/Web3Modal/web3modal#web3modal)
- [ts-morph 🏊‍♂️](https://github.com/dsherret/ts-morph)
- [@symfoni/hardhat-react 🎻(our own)](https://www.npmjs.com/package/@symfoni/hardhat-react)


Parsa Ba