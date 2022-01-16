pragma solidity ^0.8.9;

contract FighterUtils { // Create the modifier for the fee

    uint256 private fee = 0.01 ether;

    modifier checkFee {
        require(msg.value == fee, 'You dont have enough fee for the transaction');
        _;
    }
    
}