require("dotenv").config();
const { Web3 } = require("web3");

const apiKey = process.env["apiKey"];
if (!apiKey) {
  console.error("Error: API key is not defined in .env file");
  process.exit(1);
}

// Load private key
const privateKey = process.env["privateKey"];
if (!privateKey) {
  console.error("Error: Private key is not defined in .env file");
  process.exit(1);
}

// Set up the provider 
const web3 = new Web3(
  `https://go.getblock.us/${apiKey}`
);

// Generate new address and private key
const accountTo = web3.eth.accounts.create();
console.log("Generated account:", accountTo);

const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);

const createSignedTx = async (rawTx) => {
  rawTx.nonce = await web3.eth.getTransactionCount(
    accountFrom.address,
    "pending"
  );
  rawTx.gas = await web3.eth.estimateGas(rawTx);
  rawTx.maxPriorityFeePerGas = web3.utils.toWei("2", "gwei");
  rawTx.maxFeePerGas = web3.utils.toWei("50", "gwei");
  rawTx.type = "0x2"; // EIP-1559 transaction type
  rawTx.chainId = 1; // Ethereum Mainnet
  return await accountFrom.signTransaction(rawTx);
};

const sendSignedTx = async (signedTx) => {
  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction successful:", receipt);
  } catch (error) {
    console.error("Error sending transaction:", error.message);
  }
};

const amountTo = "0.01"; // ether

const rawTx = {
  to: accountTo.address,
  value: web3.utils.toWei(amountTo, "ether"),
};

createSignedTx(rawTx)
  .then(sendSignedTx)
  .catch((error) => {
    console.error("Transaction failed:", error.message);
  });
