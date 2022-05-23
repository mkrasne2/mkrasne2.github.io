pragma solidity ^0.8.0;

import "./kittyContract.sol";
import "./ownable.sol";


contract kittyMarketplace is Ownable {

    kittyContract private _kittyContract;

    struct Offer{
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers;
    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    mapping(uint256 => Offer) tokenIdToOffer;

    function setKittyContract(address _kittyContractAddress) onlyOwner public {
        _kittyContract = kittyContract(_kittyContractAddress);
    }

    constructor(address _kittyContractAddress)  {
        setKittyContract(_kittyContractAddress);
    }

    function getOffer(uint256 _tokenId) external view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        seller = tokenIdToOffer[_tokenId].seller;
        price = tokenIdToOffer[_tokenId].price;
        index = tokenIdToOffer[_tokenId].index;
        tokenId = tokenIdToOffer[_tokenId].tokenId;
        active = tokenIdToOffer[_tokenId].active;
    }

    function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
        uint256 totalOffers = offers.length;

        if(totalOffers == 0){
            listOfOffers = new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](totalOffers);
            for (uint i = 0; i < totalOffers; i++){
                if(offers[i].active == true){
                    result[i] = offers[i].tokenId;
                }
            }
            return result;
        }
        
    }
    
    function setOffer(uint256 _price, uint256 _tokenId) external{
        require(_kittyContract.ownerOf( _tokenId) == msg.sender, "You are not the owner of that kitty");
        require(tokenIdToOffer[_tokenId].active == false, "You cannot sell the same kitty twice");
        require(_kittyContract.isApprovedForAll(msg.sender, address(this)), "This operator is not approved to sell");
        Offer memory _offer = Offer({seller: payable (msg.sender), price: _price, index: offers.length, tokenId: _tokenId, active: true});

        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer);

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }


    function removeOffer(uint256 _tokenId) external{
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "You are not the seller of that kitty");
        delete tokenIdToOffer[_tokenId];
        offers[tokenIdToOffer[_tokenId].index].active = false;

        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    

    function buyKitty(uint256 _tokenId) external payable{
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(tokenIdToOffer[_tokenId].active == true, "No active order present");
        require(msg.value == tokenIdToOffer[_tokenId].price, "Price is incorrect");
        require(offer.seller != msg.sender);

        delete tokenIdToOffer[_tokenId];
        offers[tokenIdToOffer[_tokenId].index].active = false;

        if(offer.price > 0){
            offer.seller.transfer(offer.price);
        }

        _kittyContract.transferFrom(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

}