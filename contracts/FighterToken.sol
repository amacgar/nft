pragma solidity ^0.8.9;

import "./ERC721Interface.sol";
import "./Fighter.sol";

contract FighterToken is ERC721Interface, Fighter{

    mapping(uint256 => address) private fighterApproved;
    mapping(address => mapping(address => bool)) private sellerApproves;

    string public symbol;
    string public name;
    uint8 public decimals;

    constructor() {
        name = "Fighter";
        symbol = "FT";
        decimals = 0;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerFighters[_owner].length;
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return fighterOwner[_tokenId];
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external {
        // _transfer(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external {
        // _transfer(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId)
        external
    {
        fighterApproved[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function getApproved(uint256 _tokenId) external view returns (address) {
        return fighterApproved[_tokenId];
    }

    function setApprovalForAll(address operator, bool _approved) external {
        sellerApproves[msg.sender][operator] = _approved;
        emit ApprovalForAll(msg.sender, operator, _approved);
    }

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool)
    {
        return sellerApproves[owner][operator];
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        // _transfer(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }
}