const TokenDefi = artifacts.require("TokenDefi")
const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  await deployer.deploy(TokenDefi, dappToken.address, daiToken.address)
  const tokenDefi = await TokenDefi.deployed()

  // Transfer all tokens to TokenDefi
  await dappToken.transfer(tokenDefi.address, "1000000000000000000000000")

  // Transfer 100 Mock DAI Tokens to investor
  await daiToken.transfer(accounts[1], "100000000000000000000")
}
