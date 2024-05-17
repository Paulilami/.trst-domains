import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [domain, setDomain] = useState('');
    const [record, setRecord] = useState('');
    const [message, setMessage] = useState('');

    const registerDomain = async () => {
        try {
            const response = await axios.post('/register', { domain, senderAddress: '0xYourAddress', privateKey: 'YourPrivateKey' });
            setMessage(`Domain registered: ${response.data}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const setDomainRecord = async () => {
        try {
            const response = await axios.post('/setRecord', { domain, record, senderAddress: '0xYourAddress', privateKey: 'YourPrivateKey' });
            setMessage(`Record set: ${response.data}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>TRST Domain Management</h1>
            <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Domain" />
            <button onClick={registerDomain}>Register Domain</button>
            <br />
            <input value={record} onChange={(e) => setRecord(e.target.value)} placeholder="DNS Record" />
            <button onClick={setDomainRecord}>Set Record</button>
            <br />
            <p>{message}</p>
        </div>
    );
}

export default App;
