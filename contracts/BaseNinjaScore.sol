// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * @title BaseNinjaScore
 * @dev NFT contract that mints game scores as on-chain NFTs with dynamic metadata
 */
contract BaseNinjaScore is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 private _tokenIdCounter;
    
    struct GameScore {
        uint256 score;
        uint256 combo;
        uint256 level;
        uint256 timestamp;
        address player;
    }
    
    mapping(uint256 => GameScore) public gameScores;
    mapping(address => uint256[]) public playerTokens;
    mapping(address => uint256) public highestScore;
    
    event ScoreMinted(address indexed player, uint256 indexed tokenId, uint256 score);
    
    constructor() ERC721("Base Ninja Score", "NINJA") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }
    
    /**
     * @dev Mint a new score NFT
     * @param score The player's final score
     * @param combo The highest combo achieved
     * @param level The level reached
     */
    function mintScore(uint256 score, uint256 combo, uint256 level) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        
        gameScores[tokenId] = GameScore({
            score: score,
            combo: combo,
            level: level,
            timestamp: block.timestamp,
            player: msg.sender
        });
        
        playerTokens[msg.sender].push(tokenId);
        
        if (score > highestScore[msg.sender]) {
            highestScore[msg.sender] = score;
        }
        
        string memory uri = generateTokenURI(tokenId);
        _setTokenURI(tokenId, uri);
        
        emit ScoreMinted(msg.sender, tokenId, score);
        
        return tokenId;
    }
    
    /**
     * @dev Generate on-chain metadata for the NFT
     */
    function generateTokenURI(uint256 tokenId) internal view returns (string memory) {
        GameScore memory gameScore = gameScores[tokenId];
        
        string memory svg = generateSVG(gameScore);
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Base Ninja Score #',
                        tokenId.toString(),
                        '",',
                        '"description": "A Base Ninja game score NFT with ',
                        gameScore.score.toString(),
                        ' points earned on Base Chain",',
                        '"image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '",',
                        '"attributes": [',
                        '{"trait_type": "Score", "value": ',
                        gameScore.score.toString(),
                        '},',
                        '{"trait_type": "Max Combo", "value": ',
                        gameScore.combo.toString(),
                        '},',
                        '{"trait_type": "Level", "value": ',
                        gameScore.level.toString(),
                        '},',
                        '{"trait_type": "Timestamp", "value": ',
                        gameScore.timestamp.toString(),
                        '}',
                        ']}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
    
    /**
     * @dev Generate SVG image for the NFT
     */
    function generateSVG(GameScore memory gameScore) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
                '<defs>',
                '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
                '<stop offset="0%" style="stop-color:#0052FF;stop-opacity:1" />',
                '<stop offset="100%" style="stop-color:#000000;stop-opacity:1" />',
                '</linearGradient>',
                '</defs>',
                '<rect width="400" height="400" fill="url(#bg)"/>',
                '<text x="200" y="80" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">',
                unicode'🥷',
                '</text>',
                '<text x="200" y="140" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="bold">BASE NINJA</text>',
                '<rect x="50" y="160" width="300" height="180" rx="15" fill="rgba(255,255,255,0.1)" stroke="white" stroke-width="2"/>',
                '<text x="200" y="200" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle">SCORE</text>',
                '<text x="200" y="240" font-family="Arial, sans-serif" font-size="42" fill="#0052FF" text-anchor="middle" font-weight="bold">',
                gameScore.score.toString(),
                '</text>',
                '<text x="120" y="280" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">COMBO</text>',
                '<text x="120" y="305" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">',
                gameScore.combo.toString(),
                '</text>',
                '<text x="280" y="280" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">LEVEL</text>',
                '<text x="280" y="305" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">',
                gameScore.level.toString(),
                '</text>',
                '<text x="200" y="370" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.7)" text-anchor="middle">',
                'Base Chain ',
                unicode'⚡',
                '</text>',
                '</svg>'
            )
        );
    }
    
    /**
     * @dev Get all token IDs owned by a player
     */
    function getPlayerTokens(address player) public view returns (uint256[] memory) {
        return playerTokens[player];
    }
    
    /**
     * @dev Get game score details for a token
     */
    function getGameScore(uint256 tokenId) public view returns (GameScore memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return gameScores[tokenId];
    }
    
    /**
     * @dev Get player's highest score
     */
    function getHighestScore(address player) public view returns (uint256) {
        return highestScore[player];
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
