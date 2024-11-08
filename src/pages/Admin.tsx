import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from './../utils/CertiTrust.json'; // ABI file

const adminWallet = "0xC9bd96A68995487f4F4a9C90D7E90Ae95ce44Aa3"; // Admin address
const certiTrustContract = "0xdb2858E497F1976e956F9f625237FFcCb6B57E3E"; // Contract address

export default function Admin() {
  const [walletAddress, setWalletAddress] = useState('');
  const [newAdmin, setNewAdmin] = useState(''); // State for new admin address
  const [feedback, setFeedback] = useState(''); // State for feedback messages
  const [signer, setSigner] = useState(null); // Store the signer here

  // Connect MetaMask wallet
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create an ethers provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (the connected account)
        const signer = provider.getSigner();
        setSigner(signer); // Save signer for future use

        // Get the connected wallet address
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log("Connected address:", address);

        // Check the connected network
        const network = await provider.getNetwork();
        console.log("Connected network:", network);

      } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  // Handle adding a new admin by interacting with the smart contract
  const handleAddAdmin = async () => {
    try {
      if (!ethers.utils.isAddress(newAdmin)) {
        setFeedback("Invalid address format.");
        return;
      }

      if (!signer) {
        setFeedback("Please connect your wallet first.");
        return;
      }

      // Log contract and signer information
      console.log('Signer:', signer);
      console.log('New Admin Address:', newAdmin);

      // Interact with the smart contract
      const contract = new ethers.Contract(certiTrustContract, contractABI.abi, signer);

      // Estimate gas for the transaction
      const estimatedGas = await contract.estimateGas.addAdmin(newAdmin);
      console.log("Estimated Gas:", estimatedGas.toString());

      // Call the addAdmin function with a set gas limit
      const tx = await contract.addAdmin(newAdmin, { gasLimit: estimatedGas });
      console.log('Transaction Sent:', tx);

      // Wait for the transaction to be confirmed
      const res = await tx.wait();
      console.log('Transaction Confirmed:', res);

      setFeedback(`Admin ${newAdmin} added successfully.`);
      setNewAdmin(''); // Clear input after adding
    } catch (error) {
      console.error('Error adding admin:', error);

      // Handle specific MetaMask error messages
      if (error.code === 4001) {
        setFeedback('Transaction rejected by user.');
      } else if (error.code === -32000) {
        setFeedback('Insufficient gas limit.');
      } else {
        setFeedback('Error adding admin. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect MetaMask Wallet'}
      </button>

      {/* Show admin panel only if the connected wallet is the admin wallet */}
      {walletAddress === adminWallet && (
        <div>
          <h2>Admin Actions</h2>
          <div>
            <input
              type="text"
              value={newAdmin}
              onChange={(e) => setNewAdmin(e.target.value)}
              placeholder="Enter new admin address"
              className="border p-2 w-96 rounded-lg"
            />
            <button onClick={handleAddAdmin} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
              Add Admin
            </button>
          </div>
          {feedback && <p className="mt-2 text-red-500">{feedback}</p>}
        </div>
      )}

      {/* Optional message if the connected wallet is not the admin */}
      {walletAddress && walletAddress !== adminWallet && (
        <p>You are not authorized to access admin actions.</p>
      )}
    </div>
  );
}
