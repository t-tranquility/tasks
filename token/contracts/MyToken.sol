// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {

    constructor(address initialOwner)
        ERC721("MyToken", "MTT")
        Ownable(initialOwner)
    {}


    function safeMint(address to, uint256 tokenId, string memory uri) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function balanceOf(address owner) public view override(ERC721, IERC721) returns (uint256) {
        return super.balanceOf(owner);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
        super.transferFrom(from, to, tokenId);
    }


    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
