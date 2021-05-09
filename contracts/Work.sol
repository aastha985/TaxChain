//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Contractor.sol";

contract Work {
    address public owner;
    uint256 public budget;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == address(owner), "You are not the owner");
        _;
    }

    event TransferredToContractor(uint256 amount, uint256 remainingBalance);
    event ReceivedMoney(address _from, uint256 amount);

    receive() external payable {
        budget += msg.value;
        emit ReceivedMoney(msg.sender, msg.value);
    }

    function withdrawMoney(uint256 amount) public onlyOwner {
        require(
            amount <= address(this).balance,
            "Insufficient funds in contract"
        );
        address payable ownerAddr = payable(msg.sender);
        ownerAddr.transfer(amount);
        emit TransferredToContractor(amount, address(this).balance);
    }
}
