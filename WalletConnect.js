// Importing necessary libraries from ethers.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

// Defining the WalletConnect functional component
function WalletConnect() {
    const [userAccount, setUserAccount] = useState(null);
    const [error, setError] = useState('');

    // Function to handle wallet connection
    const connectWalletHandler = async () => {
        if (window.ethereum) { // Check if MetaMask is installed
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                // Request account access if needed
                const accounts = await provider.send("eth_requestAccounts", []);
                setUserAccount(accounts[0]); // Set the first account as the user account
            } catch (error) {
                setError("Failed to connect wallet");
                console.error(error);
            }
        } else {
            setError("Please install MetaMask!");
        }
    };

    return (
        <div>
            <button onClick={connectWalletHandler}>Connect Wallet</button>
            {userAccount && <p>Connected Account: {userAccount}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default WalletConnect;
