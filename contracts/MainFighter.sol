pragma solidity ^0.8.9;

import "./Fighter.sol";
import "./FighterUtils.sol";
import "./FighterToken.sol";

contract MainFighter is Fighter, FighterUtils, FighterToken{

    function buyFighter() external payable checkFee {
        uint256 id = generateFighter();
        _transferFrom(address(this), msg.sender, id);
    }

    function changeName(uint256 _id, string memory _name) external payable checkFee {
        modifyName(_id, _name);
    }

    function getAllFighters() public view returns(FighterPersonality[] memory){
        return getFighters();
    }

    function getOwnFighter(uint _id) public view returns(address){
        return getFighterOwner(_id);
    }

}