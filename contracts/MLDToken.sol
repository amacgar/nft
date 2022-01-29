pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MLDToken is ERC20 {

    uint256 supplyTotal = 290000;
    uint256 supplyInitial = 10000;

    constructor() ERC20("Molondro", "MLD") {
        // This is the total supply that we gonna generate 
        // of our token less the initial supply used for the presale
        _mint(address(this), supplyTotal);
        _mint(msg.sender, supplyInitial);
    }

}