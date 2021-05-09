//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./KYC.sol";
import "./GovtDetails.sol";

contract Transact{
    mapping(address=>uint) public tokenBalance;
    mapping(address=>uint) public taxPaid;
    KYC kyc;
    GovtDetails govt;

    constructor (KYC _kyc, GovtDetails _govt){
        kyc = _kyc;
        govt = _govt;
    }

    event TaxPaid(address _who, uint taxBefore, uint taxAfter);

    modifier OnlyVerified(){
        require(kyc.getKYC(msg.sender), "Not verified yet");
        _;
    }

    receive() external payable OnlyVerified{
        tokenBalance[msg.sender] += msg.value;
    }

    function payTax(uint amount) public OnlyVerified{
        require(tokenBalance[msg.sender] >= amount, "Insufficient tokens in account");
        
        uint taxBefore = taxPaid[msg.sender];
        tokenBalance[msg.sender] -= amount;
        taxPaid[msg.sender] += amount;
        uint taxAfter = taxPaid[msg.sender];
        
        address payable govtAddress = payable(govt.govtAddress());
        govtAddress.transfer(amount);
        
        emit TaxPaid(msg.sender, taxBefore, taxAfter);
    }
}