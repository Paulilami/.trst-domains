// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TRSTDomainRegistry {
    address public owner;
    uint256 public domainPrice;

    struct Domain {
        address owner;
        bool registered;
    }

    mapping(string => Domain) private domains;
    mapping(string => address) private resolvers;

    event DomainRegistered(string domain, address owner);
    event DomainTransferred(string domain, address newOwner);
    event ResolverUpdated(string domain, address resolver);
    event RecordUpdated(string domain, string record);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyDomainOwner(string memory _domain) {
        require(domains[_domain].owner == msg.sender, "Caller is not the domain owner");
        _;
    }

    constructor(uint256 _domainPrice) {
        owner = msg.sender;
        domainPrice = _domainPrice;
    }

    function registerDomain(string memory _domain) public payable {
        require(bytes(_domain).length > 0, "Domain name cannot be empty");
        require(endsWith(_domain, ".trst"), "Domain must end with .trst");
        require(!domains[_domain].registered, "Domain already registered");
        require(msg.value >= domainPrice, "Insufficient funds to register domain");

        domains[_domain] = Domain(msg.sender, true);
        emit DomainRegistered(_domain, msg.sender);
    }

    function endsWith(string memory str, string memory suffix) internal pure returns (bool) {
        bytes memory strBytes = bytes(str);
        bytes memory suffixBytes = bytes(suffix);
        if (strBytes.length < suffixBytes.length) {
            return false;
        }
        for (uint256 i = 0; i < suffixBytes.length; i++) {
            if (strBytes[strBytes.length - suffixBytes.length + i] != suffixBytes[i]) {
                return false;
            }
        }
        return true;
    }

    function transferDomain(string memory _domain, address newOwner) public onlyDomainOwner(_domain) {
        require(newOwner != address(0), "New owner cannot be the zero address");
        domains[_domain].owner = newOwner;
        emit DomainTransferred(_domain, newOwner);
    }

    function getDomainOwner(string memory _domain) public view returns (address) {
        return domains[_domain].owner;
    }

    function setResolver(string memory _domain, address _resolverAddress) public onlyDomainOwner(_domain) {
        resolvers[_domain] = _resolverAddress;
        emit ResolverUpdated(_domain, _resolverAddress);
    }

    function getResolver(string memory _domain) public view returns (address) {
        return resolvers[_domain];
    }

    function setRecord(string memory _domain, string memory _record) public onlyDomainOwner(_domain) {
        address resolver = resolvers[_domain];
        require(resolver != address(0), "Resolver not set for this domain");
        TRSTResolver(resolver).setRecord(_domain, _record);
        emit RecordUpdated(_domain, _record);
    }

    function getRecord(string memory _domain) public view returns (string memory) {
        address resolver = resolvers[_domain];
        require(resolver != address(0), "Resolver not set for this domain");
        return TRSTResolver(resolver).getRecord(_domain);
    }
}
