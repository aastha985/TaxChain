//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GovtDetails is Ownable {
    address public govtAddress;
    mapping(string => address) constituencyAddress;
    mapping(address => bool) public isContractor;
    mapping(address => bool) public isConstituency;
    address emptyAddress;

    event ContractorAdded(address _who);

    modifier onlyConstituency() {
        require(
            isConstituency[msg.sender],
            "You are not allowed to do this action"
        );
        _;
    }

    modifier onlyGovt() {
        require(
            msg.sender == govtAddress,
            "You are not allowed to do this action"
        );
        _;
    }

    function getConstituencyAddress(string memory cName)
        public
        view
        returns (address)
    {
        require(
            constituencyAddress[cName] != emptyAddress,
            "Constituency Name is invalid."
        );
        return constituencyAddress[cName];
    }

    function setConstituencyAddress(string memory cName, address _addr) public {
        constituencyAddress[cName] = _addr;
        isConstituency[_addr] = true;
    }

    function setGovtAddress(address _addr) public onlyOwner {
        govtAddress = _addr;
    }

    function setContractor(address _addr) public {
        isContractor[_addr] = true;
        emit ContractorAdded(_addr);
    }
}
