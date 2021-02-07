pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenDefi {
    string public name = "Token Defi";
    DappToken public dappToken;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        // make sure the user has enough token
        require(_amount > 0, "Balance should be greater than 0");

        // Transfert Mock Ddai Tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update the stackingBalance
        stakingBalance[msg.sender] += _amount;

        // Add user to the stakers' array only if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update the staking status
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    function issueTokens() public {
        require(
            msg.sender == owner,
            "Only the owner of the contract can call this function"
        );

        // Distribute tokens for all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];

            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }

    function unStakeTokens() public {
        // Retrieve the user's balance
        uint256 balance = stakingBalance[msg.sender];

        // Make sure the user has a positive balance
        require(balance > 0, "Balance should be greater than 0");

        // Transfer Mock DAI Tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Update the user's staking balance
        stakingBalance[msg.sender] = 0;

        // Update the isStaking status
        isStaking[msg.sender] = false;
    }
}
