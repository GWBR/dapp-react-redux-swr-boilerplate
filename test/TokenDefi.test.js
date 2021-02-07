const { assert } = require("chai")

const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')
const TokenDefi = artifacts.require('TokenDefi')
require("chai").use(require('chai-as-promised')).should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract("TokenDefi", ([owner, investor]) => {
  let daiToken
  let dappToken
  let tokenDefi

  before(async () => {
    // Loading the contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenDefi = await TokenDefi.new(dappToken.address, daiToken.address)

    // Transfering the Dapps tokens to farm
    await dappToken.transfer(tokenDefi.address, tokens("1000000"))

    // Transfer 100 Mock DAI Tokens to investor
    await daiToken.transfer(investor, tokens("100"), {from: owner})
  })

  describe('Mock DAI Deployment', () => {
    it('has a name',async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('Mock DApp Token', () => {
    it('has a name',async () => {
      const name = await dappToken.name()
      assert.equal(name, 'DApp Token')
    })
  })

  
  describe('Mock TokenDefi deployment', () => {
    it('has a name',async () => {
      const name = await tokenDefi.name()
      assert.equal(name, 'Token Defi')
    })

    it('contract  has token', async () => {
      const balance = await dappToken.balanceOf(tokenDefi.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming tokens', async () => {
    it('reward investor from staking',async () => {
      let result

      // Check investor balance before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens("100"), "Correct DApp Token balance from the investor")

      // Stake the Mock DAI Tokens
      await daiToken.approve(tokenDefi.address, tokens("100"), {from: investor})
      await tokenDefi.stakeTokens(tokens("100"), {from: investor})

      // Check the new investor's balance
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens("0"), "daiToken have been transferred from the investor to the contract")
      
      // Check the tokenDefi staking balance
      result = await tokenDefi.stakingBalance(investor)
      assert.equal(result.toString(), tokens("100", "investor's staking balance is correct after staking"))

      // Make sure the investor is staking
      result = await tokenDefi.isStaking(investor)
      assert.equal(result.toString(), "true", "investor has been added to the isStaking map")

      // Issue reward for stakers
      await tokenDefi.issueTokens({from: owner})

      // Make sure only the owner can call the issueTokens function
      await tokenDefi.issueTokens({ from: investor }).should.be.rejected

      // Unstake the tokens
      await tokenDefi.unStakeTokens({from: investor})

      // Check the new investor's balance
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens("100"), "Investor retrieved his farming token")

      // CHekc the farm dai token
      result = await daiToken.balanceOf(tokenDefi.address)
      assert.equal(result.toString(), tokens("0"), "Owner rewarded all the investors")

      // Make sure the isStaking status is update as well
      result = await tokenDefi.isStaking(investor)
      assert.equal(result.toString(), "false")

       // Make sure the stakingBalance of the farm for the investor is 0
       result = await tokenDefi.stakingBalance(investor)
       assert.equal(result.toString(), tokens("0"), "Investor's staking balance is back to 0")
      
    })
  })

 
})
