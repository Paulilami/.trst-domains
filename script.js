const Web3 = require('web3');
const contractABI = require('./TRSTResolverABI.json');
const registryABI = require('./TRSTDomainRegistryABI.json');

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const registryAddress = 'YOUR_REGISTRY_CONTRACT_ADDRESS';
const registry = new web3.eth.Contract(registryABI, registryAddress);

async function getRecord(domain) {
    try {
        const resolverAddress = await registry.methods.getResolver(domain).call();
        const resolver = new web3.eth.Contract(contractABI, resolverAddress);
        const record = await resolver.methods.getRecord(domain).call();
        return record;
    } catch (error) {
        console.error(`Error fetching record for ${domain}:`, error);
        return null;
    }
}

module.exports = getRecord;
