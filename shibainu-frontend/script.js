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
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenOwner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
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
const approveButton = document.getElementById("approveButton");
const checkAllowanceButton = document.getElementById("checkAllowanceButton");
const allowanceAmountField = document.getElementById("allowanceAmount");
const tokenBalanceField = document.getElementById("tokenBalance");
const tokenTotalSupplyField = document.getElementById("tokenTotalSupply");
const tokenDecimalsField = document.getElementById("tokenDecimals");
const tokenOwnerField = document.getElementById("tokenOwner");

connectButton.onclick = connectWallet;
refreshInfoButton.onclick = getTokenInfo;
transferButton.onclick = transferTokens;
approveButton.onclick = approveSpender;
checkAllowanceButton.onclick = checkAllowance;

document.addEventListener("DOMContentLoaded", function () {
  if (!connectButton) console.error("Connect button not found");
  if (!refreshInfoButton) console.error("Refresh button not found");
  if (!transferButton) console.error("Transfer button not found");
  if (!tokenNameField) console.error("Token name field not found");
  if (!tokenSupplyField) console.error("Token supply field not found");
  if (!statusDiv) console.error("Status div not found");
  if (!approveButton) console.error("Approve button not found");
  if (!checkAllowanceButton) console.error("Check allowance button not found");
  if (!allowanceAmountField) console.error("Allowance amount field not found");
  if (!tokenBalanceField) console.error("Token balance field not found");
  if (!tokenTotalSupplyField)
    console.error("Token total supply field not found");
  if (!tokenDecimalsField) console.error("Token decimals field not found");
  if (!tokenOwnerField) console.error("Token owner field not found");

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
    const symbol = await tokenContract.symbol();
    const totalSupply = await tokenContract.totalSupply();
    const decimals = await tokenContract.decimals();
    const owner = await tokenContract.owner();
    const walletAddress = await signer.getAddress();
    const balance = await tokenContract.balanceOf(walletAddress);

    tokenNameField.innerText = `${name} (${symbol})`;
    const formattedTotalSupply = ethers.utils.formatUnits(
      totalSupply,
      decimals
    );
    const formattedBalance = ethers.utils.formatUnits(balance, decimals);

    tokenBalanceField.innerText = formattedBalance;
    tokenTotalSupplyField.innerText = formattedTotalSupply;
    tokenDecimalsField.innerText = decimals;
    tokenOwnerField.innerText = owner;

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

    await getTokenInfo();
  } catch (error) {
    console.error("Transfer error:", error);
    showStatus(`Transfer failed: ${error.message}`, "alert-danger");
  }
}

async function approveSpender() {
  if (!tokenContract) {
    showStatus(
      "Contract not initialized. Please connect your wallet first.",
      "alert-warning"
    );
    return;
  }

  const spenderAddress = document.getElementById("spenderAddress").value.trim();
  const amount = document.getElementById("approveAmount").value.trim();

  if (!spenderAddress || !amount) {
    showStatus(
      "Please enter both spender address and amount.",
      "alert-warning"
    );
    return;
  }

  if (!ethers.utils.isAddress(spenderAddress)) {
    showStatus("Invalid spender address format.", "alert-danger");
    return;
  }

  try {
    const decimals = await tokenContract.decimals();
    const parsedAmount = ethers.utils.parseUnits(amount, decimals);

    showStatus(
      `Approving ${amount} tokens for ${spenderAddress}...`,
      "alert-info"
    );

    const tx = await tokenContract.approve(spenderAddress, parsedAmount);
    showStatus(
      `Approval transaction sent! Waiting for confirmation... (Hash: ${tx.hash})`,
      "alert-info"
    );

    const receipt = await tx.wait();
    showStatus(
      `✅ Successfully approved ${amount} tokens for ${spenderAddress}! (Block: ${receipt.blockNumber})`,
      "alert-success"
    );
  } catch (error) {
    console.error("Approval error:", error);
    showStatus(`❌ Approval failed: ${error.message}`, "alert-danger");
  }
}

async function checkAllowance() {
  if (!tokenContract) {
    showStatus(
      "Contract not initialized. Please connect your wallet first.",
      "alert-warning"
    );
    return;
  }

  const ownerAddress = document.getElementById("ownerAddress").value.trim();
  const spenderAddress = document
    .getElementById("allowanceSpenderAddress")
    .value.trim();

  if (!ownerAddress || !spenderAddress) {
    showStatus(
      "Please enter both owner and spender addresses.",
      "alert-warning"
    );
    return;
  }

  if (
    !ethers.utils.isAddress(ownerAddress) ||
    !ethers.utils.isAddress(spenderAddress)
  ) {
    showStatus("Invalid address format.", "alert-danger");
    return;
  }

  try {
    showStatus("Checking allowance...", "alert-info");

    const decimals = await tokenContract.decimals();
    const allowance = await tokenContract.allowance(
      ownerAddress,
      spenderAddress
    );
    const formattedAllowance = ethers.utils.formatUnits(allowance, decimals);

    allowanceAmountField.innerText = formattedAllowance;
    showStatus(
      `✅ Current allowance for ${spenderAddress}: ${formattedAllowance} tokens`,
      "alert-success"
    );
  } catch (error) {
    console.error("Allowance check error:", error);
    showStatus(
      `❌ Failed to check allowance: ${error.message}`,
      "alert-danger"
    );
    allowanceAmountField.innerText = "N/A";
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
