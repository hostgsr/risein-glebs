import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { mplToolbox, fetchAllMintByOwner } from '@metaplex-foundation/mpl-toolbox';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import { UmiInstance, nftData } from './types'; // Import necessary types, adjust the path as per your project structure
import { useNftContext } from './NftContext'; // Import the NftContext, adjust the path as per your project structure
import DashboardIntro from './DashboardIntro';

// Define the CheckNFT component
const CheckNFT = () => {
    // Use the Solana wallet hook to access wallet information
    const { publicKey, wallet, connected } = useWallet();
    // Initialize state variables
    const [umi, setUmi] = useState<UmiInstance | null>(null);
    const [loginNFTFound, setLoginNFTFound] = useState(false);
    const [nftData, setNftData] = useState<nftData | null>(null); // State variable to store JSON data
    const rpcEndpoint = clusterApiUrl('devnet');
    const [loading, setLoading] = useState(false); // State to track loading status

    // Access the NftContext from your custom hook
    const nftContext = useNftContext();

    // useEffect to initialize UmiInstance when wallet and connection are available
    useEffect(() => {
        if (wallet && connected) {
            const umiInstance = createUmi(rpcEndpoint)
                .use(walletAdapterIdentity(wallet.adapter))
                .use(mplToolbox());
            setUmi(umiInstance);
        }
    }, [wallet, connected, rpcEndpoint]);

    // useEffect to fetch and handle metadata
    useEffect(() => {
        const getMetadata = async () => {
            if (!umi || !publicKey) return;
    
            let found = false;
            setLoading(true); // Set loading to true when fetch starts
    
            try {
                const owner = new PublicKey(publicKey);
                const mintsFromOwner = await fetchAllMintByOwner(umi, owner as any);
    
                for (let mint of mintsFromOwner) {
                    const metadata = await fetchDigitalAsset(umi, mint.publicKey);
                    if (metadata && metadata.metadata.name === "LoginNFT") {
                        console.log("LoginNFT found:", mint.publicKey.toString());

                        const response = await fetch(metadata.metadata.uri);
                        const json = await response.json();
                        setNftData(json); // Update state with the JSON data

                        found = true;
                        
                        setLoginNFTFound(found);
                        if (nftContext) {
                            const { setHasLoginNFT } = nftContext;
                            if (setHasLoginNFT) {
                                setHasLoginNFT(true); // Set the value to false if setHasLoginNFT exists
                            }
                        }
                        break;
                    } 
                }
            } catch (error) {
                console.error("Error getting metadata or fetching JSON data", error);
                setLoginNFTFound(false);
            } 
        };
    
        if (wallet && connected) {
            getMetadata();
        }
    }, [umi, publicKey, wallet, connected, ]);

    // Render the component
    return (
        <div className='mt-12 py-12 h-full flex flex-col'>
            
           {loginNFTFound ? (
                <div>
                
                    {nftData && connected && (
                        <div>
                          <div className='flex justify-between flex-row  border-t border-white '> <p>User Name:</p> <p> {nftData.name}</p></div>
                            <div className='flex justify between flex-row  border-t border-white '  ><p>E-Mail: </p> <p>{nftData.email}</p></div>
                           <div className='flex justify-between flex-row  border-y border-white '  > <p>Semester: </p> <p>{nftData.semester}</p></div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default CheckNFT;
