# Shiba Inu ERC20 Token

This repository contains a simple implementation of an ERC20 token named **Shiba Inu (SHIB)**. The smart contract is written in Solidity and includes basic functionalities such as transferring tokens, checking account balances, querying the total token supply, and approving token allowances for third-party spending.

## Overview

- **Token Name:** Shiba Inu
- **Symbol:** SHIB
- **Decimals:** 18
- **Initial Supply:** 20 tokens (minted as `20 * 10^18` to account for 18 decimals)
- **Owner:** The deployer of the contract is set as the owner.

### Main Functions

- **transfer:** Sends tokens from the caller's account to another address.
- **balanceOf:** Returns the token balance of any account.
- **totalSupply:** Provides the total number of tokens in circulation.
- **approve:** Allows an account to authorize a third-party to spend a specific amount of tokens on its behalf.

### About the Shiba Inu Token

The Shiba Inu token is inspired by the popular meme coin phenomenon. It is characterized by:

- **Community-Driven:** Gaining popularity through strong community support.
- **Decentralized:** Operates on the Ethereum blockchain using smart contract technology.
- **ERC20 Standard:** Ensuring compatibility with most wallets and exchanges.
- **Low Supply (for demonstration):** This example contract has a small supply (20 tokens) to showcase the core functionalities.

## Testing and Deployment

### Prerequisites

- **MetaMask:** A browser extension for interacting with the Ethereum blockchain.
- **Ganache:** A local blockchain for testing smart contracts.
- **Remix IDE:** An online Solidity IDE for compiling, deploying, and testing smart contracts.

### Steps to Test and Deploy

#### 1. Using Remix IDE

- Open [Remix IDE](https://remix.ethereum.org/).
- Create a new file (e.g., `ShibaInuToken.sol`) and paste the Solidity code into it.
- **Compile the Contract:**
  - Select the appropriate Solidity compiler version (>=0.8.0).
  - Click on the "Compile" button.
- **Deploy the Contract:**
  - Navigate to the "Deploy & Run Transactions" tab.
  - Under "Environment," choose **Injected Provider** if you want to deploy using MetaMask. (Make sure MetaMask is connected to the desired network.)
  - Click **Deploy**. Confirm the transaction in MetaMask.

#### 2. Using Ganache with MetaMask

- **Set Up Ganache:**
  - Download and install Ganache.
  - Start a new workspace to launch a local blockchain network.
- **Connect MetaMask to Ganache:**
  - Open MetaMask, click on the network selector, and choose **Custom RPC**.
  - Enter Ganache’s RPC server URL (typically `http://127.0.0.1:7545`).
- **Deploy via Remix:**
  - In Remix, select **Injected Web3** as your environment so that it connects to the Ganache network via MetaMask.
  - Deploy the contract as described above.

#### 3. Testing the Functions

- **transfer:**
  - In Remix’s deployed contract interface, call the `transfer` function by entering the recipient's address and the token amount (remember to account for decimals, e.g., to transfer 1 token, input `1 * 10^18`).
- **balanceOf:**
  - Call the `balanceOf` function with an address to view its token balance.
- **totalSupply:**
  - Use the `totalSupply` function to check the total tokens available.
- **approve:**
  - Call the `approve` function to authorize a third-party account to spend tokens on your behalf. Verify using the `allowance` function.
