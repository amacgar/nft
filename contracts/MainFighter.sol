pragma solidity ^0.8.9;

import './Fighter.sol';
import './FighterUtils.sol';

contract MainFighter is Fighter, FighterUtils{

    function buyFighter() external payable checkFee {
        generateFighter();
    }

    function changeName(uint256 id, string memory name) external payable checkFee {
        modifyName(id, name);
    }

}