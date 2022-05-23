pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./ownable.sol";
import "./IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract kittyContract is IERC721, Ownable {

    //using SafeMath for uint256;

    uint256 public constant CREATION_LIMIT_GEN0 = 1000;
    string public constant nameK = "MarkKitties";
    string public constant symbolK = "MKS";
    bytes4 internal constant MAGIC_ERC721 = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant _Interface_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _Interface_ID_ERC165 = 0x01ffc9a7; 

    event Birth(address owner, uint256 kittenId, uint256 mId, uint256 dId, uint256 genes);
    
    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] kitties;

mapping(uint256 => address) public kittyIndexToOwner;  
mapping(address => uint256) ownershipTokenCount;

mapping(uint256 => address) kittyIndexToApproved;
mapping(address => mapping(address => bool)) private _operatorApprovals;

uint256 public gen0Counter = 0;

constructor() public{
    _createKitty(0, 0, 0, 0, address(0));
}

uint256[] digitsMom;
uint256[] digitsDad;
uint256[] digitsw;
uint256[] finalD;

function supportsInterface(bytes4 _interfaceId) external view returns (bool){
    return (_interfaceId == _Interface_ID_ERC721 || _interfaceId == _Interface_ID_ERC165);
}

function getZero()public view returns (address){
    return address(0);
}

function getContractAddress() public view returns (address){
    return address(this);
}

function createKittyGenZero(uint256 _genes)  public returns (uint256){
    require(gen0Counter < CREATION_LIMIT_GEN0);
    gen0Counter++;

    return _createKitty(0, 0, 0, _genes, msg.sender);
    
}



function _createKitty(uint256 _mId, uint256 _dId, uint256 _gen, uint256 _genes, address _owner) internal returns (uint256){
    Kitty memory _kitty = Kitty({genes: _genes, birthTime: uint64(block.timestamp), mumId: uint32(_mId), dadId: uint32(_dId), generation: uint16(_gen)});
    kitties.push(_kitty);

    uint256 newKittenId = kitties.length - 1;
    emit Birth(_owner, newKittenId, _mId, _dId, _genes);
    _transfer(address(0), _owner, newKittenId);

    return newKittenId;
}

function getKitty(uint256 kId) public view returns 
(uint256 genes,
uint256 birthTime,
uint256 mumId,
uint256 dadId,
uint256 generation,
address owner)
                {
                    
                    birthTime = uint256(kitties[kId].birthTime);
                    mumId = uint256(kitties[kId].mumId);
                    dadId = uint256(kitties[kId].dadId);
                    generation = uint256(kitties[kId].generation);
                    owner = kittyIndexToOwner[kId];
                    genes = uint256(kitties[kId].genes);
                }

function balanceOf(address owner) external view returns (uint256 balance){
    return ownershipTokenCount[owner];
}

function totalSupply() external view returns (uint256 total){
    return kitties.length;
}

function name() external view returns (string memory tokenName){
    return nameK;
}

function symbol() external view returns (string memory tokenSymbol){
    return symbolK;
}

function ownerOf(uint256 tokenId) external view returns (address owner){
    return kittyIndexToOwner[tokenId];
}

function _owns(address _claimant, uint256 _tokenId) internal view returns (bool){
    return kittyIndexToOwner[_tokenId] == _claimant;
}

function transfer(address _to, uint256 _tokenId) external{
    require(_to != address(0));
    require(_to != address(this));
    require(_owns(msg.sender, _tokenId));

   _transfer(msg.sender, _to, _tokenId);
}

function _transfer(address _from, address _to, uint256 _tokenId) internal {
    
    ownershipTokenCount[_to]++;
    kittyIndexToOwner[_tokenId] = _to;

    if (_from != address(0)) {
        ownershipTokenCount[_from]--;
        delete kittyIndexToApproved[_tokenId];
    }

    emit Transfer(_from, _to, _tokenId);

}

function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
}

function approve(address _approved, uint256 _tokenId) external {
    require(_owns(msg.sender, _tokenId));

    _approve(_approved, _tokenId);
    emit Approval(msg.sender, _approved, _tokenId);
}

function _approve(address _approved, uint256 _tokenId) internal {
    kittyIndexToApproved[_tokenId] = _approved;
}

function setApprovalForAll(address _operator, bool _approved) external{
    //require(ownershipTokenCount[msg.sender] > 0);
    require(_operator != msg.sender);

    _operatorApprovals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);

}

function getApproved(uint256 _tokenId) external view returns (address){
    require(_tokenId < kitties.length);
    return kittyIndexToApproved[_tokenId];
}

function isApprovedForAll(address _owner, address _operator) public view returns (bool){
    return _operatorApprovals[_owner][_operator];
}

function transferFrom(address _from, address _to, uint256 _tokenId) external{
    require(_owns(_from, _tokenId) == true);
    require(_approvedFor(_to, _tokenId) == true || isApprovedForAll(_from, msg.sender) == true || kittyIndexToOwner[_tokenId] == msg.sender);
    
    require(_to != address(0) && _to != kittyIndexToOwner[_tokenId]);
    require(_tokenId < kitties.length);

    _transfer(_from, _to, _tokenId);
}

function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool){
    return kittyIndexToApproved[_tokenId] == _claimant;
}


function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool){
    if (!_isContract(_to)){
        return true;
    }

    bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);

    //onERC721Received
    return returnData == MAGIC_ERC721;
}

function _isContract(address _to) internal view returns (bool){
    uint32 size;
    assembly{
        size := extcodesize(_to)
    }
    return size > 0;
}

function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
    safeTransferFrom(_from, _to, _tokenId, "");
}

function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) public {
    require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId));
    
    _safeTransfer(_from, _to, _tokenId, data);
}



function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal view returns (bool){
    require(_to != address(0));
    require(_owns(_from, _tokenId));
    require(_tokenId < kitties.length);

    return (_spender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender));
}




   function _generateDigits(uint256 _dad, uint256 _mom, uint256 dadId, uint256 momId) internal {
        delete digitsMom;
        delete digitsDad;
        delete finalD;
        uint256 numberMom = _mom;
        uint256 numberDad = _dad;
        
        while (digitsDad.length < 6) {
            uint256 digitM = uint256(numberMom % 10);
            uint256 digitD = uint256(numberDad % 10);
            numberMom = numberMom / 10;
            numberDad = numberDad / 10;
            digitsMom.push(digitM);
            digitsDad.push(digitD);
        }
        while (digitsDad.length < 13) {
            uint256 digitM = uint256(numberMom % 100);
            uint256 digitD = uint256(numberDad % 100);
            numberMom = numberMom / 100;
            numberDad = numberDad / 100;
            digitsMom.push(digitM);
            digitsDad.push(digitD);
        }
        
        _mixDNA(dadId, momId);
        
    }

    
    

    function _mixDNA(uint256 dadId, uint256 momId) internal returns (uint256) {
        
        uint256 random = uint256(block.timestamp % 255);
        uint256 i;
        uint256 index = 12;
        
        
        
        for (i = 1; i <= 2048; i = i*2) {
            if (random & i != 0) {
                finalD.push(digitsMom[index]);
            } else {
                finalD.push(digitsDad[index]);
            }
            index = index - 1;
            
        }
        if (finalD[0] == digitsMom[digitsMom.length - 1]){
            finalD.push(digitsDad[0]);
        } else {
            finalD.push(digitsMom[0]);
        }
            uint256 newGene;
            uint256 newGeneration;
        
                for (i = 0; i < 12; i++){
                    if (i < 6){
                        newGene = newGene + finalD[i];
                        newGene = newGene * 100;
                    } if (i >= 6){
                        newGene = newGene + finalD[i];
                        newGene = newGene * 10;
                    }
                    
                }

                if (kitties[dadId].generation > kitties[momId].generation){
                    newGeneration = kitties[dadId].generation + 1;
                } else if  (kitties[dadId].generation < kitties[momId].generation){
                    newGeneration = kitties[momId].generation + 1;
                } else {
                    newGeneration = kitties[momId].generation + 1;
                }

                return _createKitty(momId, dadId, newGeneration, newGene, msg.sender);
                
        }
    
function breedKitty(uint256 _cat1, uint256 _cat2) public {
    require(kittyIndexToOwner[_cat1] == msg.sender && kittyIndexToOwner[_cat2] == msg.sender);
    require(_cat1 != _cat2);
    uint256 dadGenes = kitties[_cat1].genes;
    uint256 momGenes = kitties[_cat2].genes;
    
    return _generateDigits(dadGenes, momGenes, _cat1, _cat2);
}


}