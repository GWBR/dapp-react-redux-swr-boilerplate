const TokenDefi = artifacts.require("TokenDefi")

module.exports = async function(callback) {
    let tokenDefi = await TokenDefi().deployed()
    await tokenDefi.issueTokens()

    console.log("Tokens were issued!")
    callback()
}