pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MLDToken is ERC20, Ownable {

    uint256 supplyTotal = _convertTokenWithDecimals(290000);
    uint256 supplyInitial = _convertTokenWithDecimals(10000);

    constructor() ERC20("Molondro", "MLD") {
        // This is the total supply that we gonna generate 
        // of our token less the initial supply used for the presale
        _mint(address(this), supplyTotal);
        _mint(msg.sender, supplyInitial);
    }

    function generateToken(address _to, uint256 _amount) public onlyOwner{
        uint256 tokenConverted = _convertTokenWithDecimals(_amount);
        _mint(_to, tokenConverted);
    }

    function _convertTokenWithDecimals(uint256 _amount) private pure returns(uint256) {
        return _amount * 10**decimals();
    }

    function decimals() override public pure returns(uint8) {
        return 4;
    }

    function buyToken(address _to, uint256 _amount) public payable {
        require(msg.value > 0 ether, "You should send ethereum to buy MLD token");
        if (_amount == 0) {
            payable(msg.sender).transfer(msg.value);
            return;
        }
        _mint(_to, _amount);
    }

    function getContractBalance() public payable onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
}