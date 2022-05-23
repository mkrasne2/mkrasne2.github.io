// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)

pragma solidity ^0.8.0;


contract Ownable  {
    
    modifier onlyOwner() {
        require(msg.sender == 0x6a310dF8e4f973dBf995234b68CE75b27c673914, "Ownable: caller is not the owner");
        _;
    }

}
