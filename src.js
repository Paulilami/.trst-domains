const express = require('express');
const Web3 = require('web3');
const contractABI = require('./TRSTDomainRegistryABI.json');
const resolverABI = require('./TRSTResolverABI.json');
const app = express();
const port = 3000;

// Configure web3 and contract instances
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const registryAddress = 'YOUR_REGISTRY_CONTRACT_ADDRESS';
const registry = new web3.eth.Contract(contractABI, registryAddress);

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to register a domain
app.post('/register', async (req, res) => {
    const { domain, senderAddress, privateKey } = req.body;

    // Create a transaction to register the domain
    const tx = registry.methods.registerDomain(domain);
    const gas = await tx.estimateGas({ from: senderAddress });
    const data = tx.encodeABI();
    const txData = {
        from: senderAddress,
        to: registryAddress,
        data,
        gas
    };

    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.send(receipt);
});

// Endpoint to set a resolver
app.post('/setResolver', async (req, res) => {
    const { domain, resolverAddress, senderAddress, privateKey } = req.body;

    const tx = registry.methods.setResolver(domain, resolverAddress);
    const gas = await tx.estimateGas({ from: senderAddress });
    const data = tx.encodeABI();
    const txData = {
        from: senderAddress,
        to: registryAddress,
        data,
        gas
    };

    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.send(receipt);
});

// Endpoint to set a DNS record
app.post('/setRecord', async (req, res) => {
    const { domain, record, senderAddress, privateKey } = req.body;

    const resolverAddress = await registry.methods.getResolver(domain).call();
    const resolver = new web3.eth.Contract(resolverABI, resolverAddress);

    const tx = resolver.methods.setRecord(domain, record);
    const gas = await tx.estimateGas({ from: senderAddress });
    const data = tx.encodeABI();
    const txData = {
        from: senderAddress,
        to: resolverAddress,
        data,
        gas
    };

    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.send(receipt);
});

app.listen(port, () => {
    console.log(`Domain management service listening at http://localhost:${port}`);
});
