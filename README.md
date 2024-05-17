# TRST Domain Management Service

## Overview

The TRST Domain Management Service is a decentralized application (DApp) that allows users to register and manage `.trst` domains on the Ethereum blockchain. This service includes functionalities for domain registration, setting DNS records, and transferring domain ownership. Users can interact with the service through a user-friendly web interface.

## Features

- **Domain Registration**: Register `.trst` domains on the Ethereum blockchain.
- **Domain Management**: Transfer domain ownership and manage DNS records associated with the domain.
- **Decentralized**: Operates on the Ethereum blockchain, ensuring security and immutability.

## Project Structure

- **Smart Contracts**: Written in Solidity, deployed on the Ethereum blockchain.
  - `TRSTDomainRegistry.sol`: Manages domain registrations and ownership transfers.
  - `TRSTResolver.sol`: Manages DNS records for the domains.
- **Backend**: A Node.js server to interact with the Ethereum blockchain.
- **Frontend**: A React application that provides a user interface for domain management.

## Smart Contracts

### TRSTDomainRegistry

This contract handles the registration and management of `.trst` domains.

#### Key Functions:

- **registerDomain**: Registers a new `.trst` domain.
- **transferDomain**: Transfers ownership of a domain to a new owner.
- **setResolver**: Sets the resolver contract address for a domain.
- **setRecord**: Sets a DNS record for a domain.

#### Events:

- `DomainRegistered`: Emitted when a domain is registered.
- `DomainTransferred`: Emitted when a domain is transferred to a new owner.
- `ResolverUpdated`: Emitted when the resolver address is updated.
- `RecordUpdated`: Emitted when a DNS record is updated.

### TRSTResolver

This contract handles the storage and management of DNS records for `.trst` domains.

#### Key Functions:

- **setRecord**: Sets a DNS record for a domain.
- **getRecord**: Retrieves the DNS record for a domain.

#### Events:

- `RecordUpdated`: Emitted when a DNS record is updated.

## Backend

The backend is a Node.js application that provides REST APIs for interacting with the smart contracts.

### Key Endpoints:

- **POST /register**: Registers a new domain.
- **POST /setResolver**: Sets the resolver address for a domain.
- **POST /setRecord**: Sets a DNS record for a domain.

## Frontend

The frontend is a React application that provides a user-friendly interface for managing `.trst` domains.

### Key Features:

- **Register Domain**: Form to register a new domain.
- **Manage DNS Records**: Interface to set and update DNS records.
- **Transfer Domain**: Interface to transfer domain ownership.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- An Ethereum wallet (e.g., MetaMask) and some ETH for gas fees.
- Infura account for Ethereum node access.

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/trst-domain-management.git
    cd trst-domain-management
    ```

2. **Install backend dependencies**:
    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```sh
    cd ../frontend
    npm install
    ```

### Configuration

1. **Smart Contract Deployment**:
   - Deploy the `TRSTDomainRegistry` and `TRSTResolver` contracts on the Ethereum blockchain.
   - Update the contract addresses and ABI files in the backend configuration.

2. **Backend Configuration**:
   - Create a `.env` file in the `backend` directory with your Infura project ID and contract addresses.

3. **Frontend Configuration**:
   - Update the API endpoints in the frontend configuration if necessary.

### Running the Application

1. **Start the backend server**:
    ```sh
    cd backend
    node index.js
    ```

2. **Start the frontend application**:
    ```sh
    cd ../frontend
    npm start
    ```

3. **Access the application**:
   Open `http://localhost:3000` in your web browser.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify and extend this README file to better fit your project and add any additional details you think are necessary.
