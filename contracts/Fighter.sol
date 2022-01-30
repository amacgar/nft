pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";


contract Fighter{

    event FighterGenerated(uint id, string name, uint8 dmg, uint8 speed);
    event NameChanged(uint id, string name);

    struct FighterPersonality {
        string name;
        uint id;
        uint8 dmg;
        uint8 speed;
    }

    FighterPersonality[] public fighters;

    mapping (uint => address) fighterOwner;
    mapping (address => uint[]) ownerFighters;

    function generateFighter() returns(uint256){ // TODO cambiarla de public a internal
        uint id = fighters.length + 1;
        uint8 dmg = uint8(generateRandomNumber(249));
        uint8 speed = uint8(generateRandomNumber(99));
        string memory name = "test"; // Strings.toString(id); Tiene un coste por lo tanto habria que realizar el pago para poder usarlo
        fighters.push(FighterPersonality(name, id, dmg, speed));
        ownerFighters[msg.sender].push(id);
        fighterOwner[id] = msg.sender;
        emit FighterGenerated(id, name, dmg, speed);
        return id;
    }
    
    function generateRandomNumber(uint _max) private view returns (uint) {
        uint result = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % (_max - 1)
        );
        return result;
    }

    function modifyName(uint256 _id, string memory _newName) internal {
        fighters[_id-1].name = _newName;
        emit NameChanged(_id, _newName);
    }

    function getFighters() public view returns(FighterPersonality[] memory) { // TODO Esta funcion no debe existir
        return fighters;
    }

    function getFighterOwner(uint _id) public view returns(address) { // TODO Esta funcion no debe existir
        return fighterOwner[_id];
    }
}