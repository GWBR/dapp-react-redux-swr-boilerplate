require("babel-register")
require("babel-polyfill")

module.exports = {
  contracts_directory: "./src/contracts/dev",
  contracts_build_directory: "./src/contracts/abis",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "petersburg",
    },
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
  },
}
