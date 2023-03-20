//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract factoryNFT is ERC721URIStorage{

    uint256 public tokenCount;
    
    mapping(uint => address) public tokenOwner;
    mapping(string => bool) private _usedTokenURIs;
   
    //admin mint nft event
    event adminMinted(
        uint256 nftId,
        string uri
    );

    constructor() ERC721("Tech Alchemy", "TAC") {
        
    }
    function tokenURIExists(string memory _tokenURI) public view returns (bool) {
    return _usedTokenURIs[_tokenURI] == true;
   }
    
    //Allow to mint NFT 
    function adminMint(address _minter, string memory _tokenURI) external returns(uint256) {
        require(!tokenURIExists(_tokenURI), "Token URI already exists");
        tokenCount++;
        _mint(_minter, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        _usedTokenURIs[_tokenURI] = true;
      
        emit adminMinted(tokenCount, _tokenURI);
        return tokenCount;
    }
}