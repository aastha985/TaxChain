//SPDX-License-Identifier: UNLICENSED;
pragma solidity ^0.8.0;


contract KYC {
    mapping(address=>bool) allowed;

    function completeKYC(address _address) public {
        allowed[_address] = true;
    }
    function rejectKYC(address _address) public {
        allowed[_address] = false;
    }

    function getKYC(address _address) public view returns(bool){
        return allowed[_address];
    }
}