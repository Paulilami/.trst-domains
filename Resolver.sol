// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TRSTResolver {
    address public owner;
    mapping(string => string) private records;

    event RecordUpdated(string domain, string record);

    modifier onlyDomainOwner(string memory domain) {
        TRSTDomainRegistry registry = TRSTDomainRegistry(owner);
        require(registry.getDomainOwner(domain) == msg.sender, "Caller is not the domain owner");
        _;
    }

    constructor(address _registryAddress) {
        owner = _registryAddress;
    }

    function setRecord(string memory domain, string memory record) public onlyDomainOwner(domain) {
        records[domain] = record;
        emit RecordUpdated(domain, record);
    }

    function getRecord(string memory domain) public view returns (string memory) {
        return records[domain];
    }
}
