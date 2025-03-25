const CONTRACT_ADDRESS = "0x77AE45B8754Fa798E138DAA624e626c7d62a7b8F";
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

let provider;
let signer;
let tokenContract;

const connectButton = document.getElementById("connectButton");
const refreshInfoButton = document.getElementById("refreshInfo");
const transferButton = document.getElementById("transferButton");
const tokenNameField = document.getElementById("tokenName");
const tokenSupplyField = document.getElementById("tokenSupply");
const statusDiv = document.getElementById("status");

connectButton.onclick = connectWallet;
refreshInfoButton.onclick = getTokenInfo;
transferButton.onclick = transferTokens;

document.addEventListener("DOMContentLoaded", function () {
  if (!connectButton) console.error("Connect button not found");
  if (!refreshInfoButton) console.error("Refresh button not found");
  if (!transferButton) console.error("Transfer button not found");
  if (!tokenNameField) console.error("Token name field not found");
  if (!tokenSupplyField) console.error("Token supply field not found");
  if (!statusDiv) console.error("Status div not found");

  if (typeof ethers === "undefined") {
    console.error("Ethers.js not loaded!");
    showStatus("Error: Ethereum library not loaded", "alert-danger");
  }
});

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      console.log("Provider initialized:", provider);
      console.log("Signer initialized:", signer);

      tokenContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      console.log("Contract initialized:", tokenContract);

      const isContract = await provider.getCode(CONTRACT_ADDRESS);
      if (isContract === "0x") {
        showStatus(
          "No contract found at the specified address!",
          "alert-danger"
        );
        return;
      }

      showStatus("Connected to MetaMask!", "alert-success");
      await getTokenInfo();
    } catch (error) {
      console.error("Connection error:", error);
      showStatus(`Failed to connect: ${error.message}`, "alert-danger");
    }
  } else {
    showStatus(
      "MetaMask not detected. Please install MetaMask!",
      "alert-danger"
    );
  }
}

async function getTokenInfo() {
  if (!tokenContract) {
    showStatus(
      "Contract not initialized. Please connect your wallet first.",
      "alert-warning"
    );
    return;
  }

  try {
    const name = await tokenContract.name();
    const totalSupply = await tokenContract.totalSupply();
    tokenNameField.innerText = name;

    tokenSupplyField.innerText = totalSupply.toString();
    showStatus("Token info refreshed successfully.", "alert-success");
  } catch (error) {
    showStatus(`Error fetching token info: ${error.message}`, "alert-danger");
  }
}

async function transferTokens() {
  if (!tokenContract) {
    showStatus(
      "Contract not initialized. Please connect your wallet first.",
      "alert-warning"
    );
    return;
  }

  const recipientAddress = document
    .getElementById("transferAddress")
    .value.trim();
  const amount = document.getElementById("transferAmount").value.trim();

  if (!recipientAddress || !amount) {
    showStatus(
      "Please enter both recipient address and amount.",
      "alert-warning"
    );
    return;
  }

  if (!ethers.utils.isAddress(recipientAddress)) {
    showStatus("Invalid recipient address format.", "alert-danger");
    return;
  }

  try {
    const decimals = await tokenContract.decimals();
    const parsedAmount = ethers.utils.parseUnits(amount, decimals);

    showStatus("Processing transfer...", "alert-info");

    const tx = await tokenContract.transfer(recipientAddress, parsedAmount);
    showStatus(`Transaction sent. Hash: ${tx.hash}`, "alert-info");

    const receipt = await tx.wait();
    showStatus(
      `Transfer confirmed in block ${receipt.blockNumber}`,
      "alert-success"
    );
  } catch (error) {
    console.error("Transfer error:", error);
    showStatus(`Transfer failed: ${error.message}`, "alert-danger");
  }
}

function showStatus(message, alertClass) {
  if (!statusDiv) {
    console.error("Status div not found!");
    console.log("Status message:", message);
    return;
  }
  statusDiv.style.display = "block";
  statusDiv.className = `alert ${alertClass}`;
  statusDiv.innerText = message;
}
