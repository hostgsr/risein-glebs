import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useNftContext } from './NftContext'; 

// Define WalletSectionProps interface
interface WalletSectionProps {
    withBalace: boolean;
    onlyDisconnected: boolean;
}

// Define the WalletSection component
const WalletSection: React.FC<WalletSectionProps> = ({ withBalace, onlyDisconnected }) => {
    // Access the Solana connection hook
    const { connection } = useConnection();
    // Access the Solana wallet hook to manage wallets
    const {
        wallets,
        wallet,
        publicKey,
        connected,
        disconnect,
        select,
        connect
    } = useWallet();
    // Access the NftContext from your custom hook
    const nftContext = useNftContext();
    // Initialize state for the selected wallet name
    const [selectedWalletName, setSelectedWalletName] = useState(wallets[0].adapter);
    // Check if the wallet is not installed
    const notInstalledWallet = wallets[0].readyState === "NotDetected";

    // Function to disconnect the wallet
    const disconnectWallet = async () => {
        if (wallet) {
            await disconnect();

            if (nftContext) {
                const { setHasLoginNFT } = nftContext;
                if (setHasLoginNFT) {
                    setHasLoginNFT(false); 
                }
            }

            console.log("disconnected");
        }
    };

    // Render the component differently based on onlyDisconnected prop
    if (onlyDisconnected) {
        return connected ? (
            <div className='py-5'>
                <button 
                    className='border-white rounded-full border py-1 w-fit px-5' 
                    onClick={() => disconnectWallet()}
                > 
                    Disconnect
                </button>
            </div>
        ) : null;
    }

    // Render the main wallet section
    return (
        <div className='flex flex-col  '>
            { !notInstalledWallet ? <div className='flex flex-col'>
                {/* Display connection status and public key,I used it for development stage */}
                <div className='hidden' >{connected ? 'Yes' : 'No'}</div>
                <div className='hidden'>{publicKey ? publicKey.toString() : 'Not connected'}</div>
                {/* Render login button if not connected, otherwise render disconnect button */}
                { !publicKey ? (
                    <button 
                        className=' w-fit self-end border border-white py-1 px-5 rounded-full ' 
                        onClick={() => select(selectedWalletName.name)}
                    > 
                        Login
                    </button>
                ) : (
                    <button 
                        className='border-white rounded-full border py-1 w-fit px-5' 
                        onClick={() => disconnectWallet()}
                    > 
                        Disconnect
                    </button>
                )}
            </div> : "No Phantom wallet installed" }
        </div>
    );
};

export default WalletSection;
