# Simple DAPP

This project was created as a boilerplate for a DAPP on the ethereum blockchain.

## About The Project

### Built With

- react
- typescript
- redux
- ethers.js
- swr
- truffle

### Tested with

- chai
- mocha

## Getting started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before any thing, make sure:

- Metamask is intalled on your browser

### Install from source

First, clone the project, then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
yarn install    # Install project dependencies

```

### Run

First, you need to run a personnal Ethereum blockchain using [Ganache](https://www.trufflesuite.com/ganache).
Then, you need to compile and deploy the smart contracts on your local blockchain

```bash
truffle compile
truffle migrate --reset
```

Then you can run the application

```bash
yarn start      # Compile and launch (same as `npm start`)
```

If you see the balance staying on **Loading...** it means that the smart contracts were not found on the blockchain. Make sure you switched to the **local network on Metamask**.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Test

To run tests for the smart contract, use :

```bash
truffle test
```

## Inspirations

Insparations from:

- [Uniswap](https://github.com/Uniswap/uniswap-interface/tree/master)
- [hypertext](https://github.com/NoahZinsmeister/hypertext)
- [sushiswap-lite](https://github.com/sushiswap/sushiswap-lite)
- [pancakswap](https://github.com/pancakeswap/pancake-frontend)
- [defi_tutorial](https://github.com/dappuniversity/defi_tutorial)
