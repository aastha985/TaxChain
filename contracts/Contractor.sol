//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Work.sol";

contract Contractor{

    event WorkCreated(address owner, address _work);

    function createNewWork() public{
        Work w = new Work(msg.sender);
        emit WorkCreated(msg.sender, address(w));
    }
}