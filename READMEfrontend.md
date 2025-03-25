# Cryptocurrency Interface

## Setup

1. Clone this repository to your local machine.

2. Open `index.html` in a text editor and update the following:

   - Replace `YOUR_CONTRACT_ADDRESS` with your deployed contract address
   - Update the `contractABI` if your contract has different functions

3. Host the files on a local or web server:
   - For local testing, you can use Python's built-in HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Then open `http://localhost:8000` in your browser

## Using the Interface

1. **Connect Wallet**

   - Click the "Connect MetaMask" button
   - Approve the connection in MetaMask
   - Your wallet address will be displayed when connected

2. **View Token Information**

   - Click "Get Token Name" to view the cryptocurrency name
   - Click "Get Token Supply" to view the total token supply

3. **Transfer Tokens**
   - Enter the recipient's address
   - Enter the amount to transfer
   - Click "Transfer"
   - Approve the transaction in MetaMask
   - Wait for transaction confirmation
