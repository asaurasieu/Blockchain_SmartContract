# Shiba Inu Token Interface

## Setup

1. Clone this repository to your local machine.

2. The contract address and ABI are already configured in `script.js`:

   - Contract Address: `0x77AE45B8754Fa798E138DAA624e626c7d62a7b8F`
   - The `CONTRACT_ABI` is pre-configured for all necessary token functions

3. Host the files on a local or web server:
   - For local testing, you can use Python's built-in HTTP server:
     ```bash
      npx http-server
     ```
   - Then open `http://localhost:8000` in your browser

## Using the Interface

1. **Connect Wallet**

   - Click the "Connect MetaMask" button
   - Approve the connection in MetaMask
   - Your wallet will be connected when successful

2. **View Token Information**

   - Token Name and Balance will be displayed automatically after connecting
   - Click "Refresh Token Info" to update the information

3. **Transfer Tokens**

   - Enter the recipient's address
   - Enter the amount to transfer
   - Click "Transfer"
   - Approve the transaction in MetaMask
   - Wait for transaction confirmation

4. **Approve Spender**

   - Enter the spender's address
   - Enter the amount to approve
   - Click "Approve"
   - Approve the transaction in MetaMask

5. **Check Allowance**
   - Enter the token owner's address
   - Enter the spender's address
   - Click "Check Allowance"
   - View the current allowance amount
