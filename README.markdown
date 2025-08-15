# Ethereum Transaction Script

This repository contains a Node.js script that uses the `web3.js` library to perform an Ethereum transaction. The script generates a new Ethereum account, signs a transaction using a private key, and sends a specified amount of Ether to the generated account on the Ethereum Mainnet.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 16 or higher recommended).
- **npm**: Node package manager, installed with Node.js.
- **Ethereum Wallet**: A funded Ethereum wallet with a private key.
- **API Key**: An API key from a provider like [GetBlock](https://getblock.io/) to connect to the Ethereum network.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:
   Install the required Node.js packages by running:
   ```bash
   npm install web3 dotenv
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root and add the following:
   ```env
   apiKey=your_getblock_api_key
   privateKey=your_ethereum_private_key
   ```
   Replace `your_getblock_api_key` with your GetBlock API key and `your_ethereum_private_key` with your Ethereum wallet's private key. **Never commit the `.env` file to version control.**

## Usage

1. **Run the Script**:
   Execute the script using Node.js:
   ```bash
   node index.js
   ```

2. **What the Script Does**:
   - Generates a new Ethereum account (address and private key).
   - Creates a transaction to send 0.01 ETH from the account specified in the `.env` file to the newly generated account.
   - Signs the transaction using EIP-1559 parameters (dynamic gas fees).
   - Sends the signed transaction to the Ethereum Mainnet via the GetBlock provider.
   - Logs the transaction receipt or any errors encountered.

3. **Example Output**:
   ```plaintext
   Generated account: {
     address: '0x...',
     privateKey: '0x...',
     ...
   }
   Transaction successful: {
     transactionHash: '0x...',
     ...
   }
   ```

## Configuration

- **Transaction Amount**: Modify the `amountTo` variable in `index.js` to change the amount of Ether to send (default is 0.01 ETH).
- **Gas Settings**: The script uses EIP-1559 transaction parameters:
  - `maxPriorityFeePerGas`: 2 Gwei
  - `maxFeePerGas`: 50 Gwei
  Adjust these values in the `createSignedTx` function if needed.
- **Network**: The script is configured for Ethereum Mainnet (`chainId: 1`). To use a testnet, update the `chainId` and provider URL accordingly.

## Security Notes

- **Private Key Safety**: Never share or commit your `.env` file or private key to GitHub. Add `.env` to your `.gitignore` file.
- **API Key Security**: Keep your GetBlock API key confidential.
- **Test Before Mainnet**: Test the script on a testnet (e.g., Sepolia) before using it on Mainnet to avoid unintended Ether loss.

## Dependencies

- [web3.js](https://www.npmjs.com/package/web3): Library for interacting with the Ethereum blockchain.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.

## Troubleshooting

- **API Key Error**: Ensure the `apiKey` in `.env` is valid and correctly formatted.
- **Private Key Error**: Verify that the `privateKey` is correct and corresponds to a funded Ethereum account.
- **Network Issues**: Check your internet connection and the GetBlock API status.
- **Gas Errors**: If the transaction fails due to gas, adjust `maxPriorityFeePerGas` or `maxFeePerGas` in `index.js`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.