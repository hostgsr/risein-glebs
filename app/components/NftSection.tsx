import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { clusterApiUrl, LAMPORTS_PER_SOL, Connection, PublicKey } from '@solana/web3.js';
import { mplTokenMetadata, createNft, Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { generateSigner, percentAmount, unwrapOption, publicKey, sol, createGenericFileFromBrowserFile } from '@metaplex-foundation/umi'
import { mplToolbox, fetchAllTokenByOwnerAndMint, fetchAllMintByOwner } from '@metaplex-foundation/mpl-toolbox'
import { ShyftSdk, Network } from '@shyft-to/js';

import { useNftContext } from './NftContext';
import { createFungible, createAndMint, TokenStandard } from '@metaplex-foundation/mpl-token-metadata'
import { none } from '@metaplex-foundation/umi'
import { mintToCollectionV1, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import { UmiInstance, Amount } from './types';
import WalletSection from './WalletSection';
import CheckNFT from './CheckNFT';

// Define NftSectionProps interface
interface NftSectionProps {
    fullWidth: boolean;
}

// Define the NftSection component
const NftSection: React.FC<NftSectionProps> = ({ fullWidth }) => {
    // Use the Solana wallet hook to access wallet information
    const { publicKey, wallet, wallets, connect, connected } = useWallet();
    // Initialize state variables
    const [umi, setUmi] = useState<UmiInstance | null>(null);
    // Define the Solana RPC endpoint
    const rpcEndpoint = "https://api.devnet.solana.com";
    // Initialize balance state
    const [balance, setBalance] = useState<string>('');
    // Access the NftContext from your custom hook
    const nftContext = useNftContext();
    // Check if the user has a Login NFT
    const hasLoginNFT = nftContext?.hasLoginNFT;
    // Initialize user data state
    const [name, setName] = useState('User Name');
    const [email, setEmail] = useState('example@example.com');
    const [semester, setSemester] = useState('Semester:SS2024');
    // Check if the wallet is not installed
    const notInstalledWallet = wallets[0].readyState === "NotDetected";
    // Define irysUploader options
    const irysUploaderOptions = {
        address: 'https://devnet.irys.xyz',
        timeout: 10000,
        providerUrl: rpcEndpoint,
        priceMultiplier: 1.1,
    };

    // Connect the wallet when the component mounts. Show mint button if wallet connected
    useEffect(() => {
        if (!connected && wallet && !notInstalledWallet) {
            connect();
        }
    }, [connect, connected, wallet]);

    // Create Umi instance after wallet connection
    useEffect(() => {
        if (wallet && connected) {
            const umiInstance = createUmi(rpcEndpoint)
                .use(walletAdapterIdentity(wallet.adapter))
                .use(mplTokenMetadata())
                .use(irysUploader(irysUploaderOptions))
                .use(mplToolbox())
                .use(mplBubblegum());

            setUmi(umiInstance);
        }
    }, [wallet, connected, rpcEndpoint]);

    // Handle the creation of a new NFT
    const handleCreateNFT = async () => {
        if (!umi) return;

        try {
            // Code to create 'uri' using user input
            const uri = await umi.uploader.uploadJson({
                name,
                email,
                semester,
                
            });

            console.log("Uri: " + uri);
            const mint = generateSigner(umi);
            const mintPublic = mint.publicKey;

            const MintAddress = await createNft(umi, {
                mint,
                name: 'LoginNFT',
                uri: uri,
                sellerFeeBasisPoints: percentAmount(100),
            }).sendAndConfirm(umi);

            console.log("Mint Address:", MintAddress);
        } catch (error) {
            console.error("Error creating NFT:", error);
        }
    };

    // Fetch and update wallet balance
    useEffect(() => {
        const fetchBalance = async () => {
            if (!umi || !publicKey) return;

            try {
                const balanceData = await umi.rpc.getBalance(publicKey as any);
                const balanceInSol = Number(balanceData.basisPoints) / Math.pow(10, balanceData.decimals);
                setBalance(balanceInSol.toFixed(4));
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        if (wallet && connected) {
            fetchBalance();
        }
    }, [umi, publicKey, wallet, connected]);

    // Set loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (connected || !connected) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [connected]);

    // Render loading state
    if (loading) {
        return (
            <div className='flex justify-center items-center h-full'>
                Loading...
            </div>
        );
    }

    // Render wallet connection state and NFT registration
    if (connected && !hasLoginNFT) {
        return (
            <div className='flex flex-col p-5 h-full'>
                <div className='flex flex-row justify-between w-full'>
                    <span className=' w-fit border-white rounded-full border py-1 px-5 '>Account Registration</span>
                    <div className='flex flex-col'>
                        {Number(balance) < 0.005 ? (
                            <div><span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span></div>) : (
                            <div><span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span></div>)
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    {!hasLoginNFT ? (
                        <div className={`${fullWidth ? "grid-cols-2" : "grid-cols-1"} grid gap-5 pt-12 pb-12`}>
                            {fullWidth ? <div className='mt-12 col-span-2 max-w-[450px]'>
                                <p>Register to mint your personal verification access as an NFT. This process utilizes blockchain technology to provide a reliable and secure method of digital authentication.</p>
                            </div> : null}
                            <span>Your data:</span>
                            <input
                                type="text"
                                placeholder="User Name"
                                className=' bg-transparent text-white border-b border-white'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                className=' bg-transparent text-white border-b border-white'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Semester"
                                className=' bg-transparent text-white border-b border-white'
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                        </div>
                    ) : null}
                    <div className='flex flex-row items-center justify-between w-full'>
                        {!hasLoginNFT && (
                            <button className=' w-fit h-fit border-white rounded-full border py-1 px-5 ' onClick={handleCreateNFT}>
                                Sign Up
                            </button>
                        )}
                        <WalletSection withBalace={false} onlyDisconnected={true} />
                    </div>
                </div>
            </div>
        );
    }

    // Render connected wallet state and CheckNFT component
    return (
        <div className=' w-full h-full justify-between flex flex-col p-5  '>
            <div className='flex flex-row w-full justify-between'>
                <span className='border-white rounded-full border py-1 w-fit px-5'>{connected ? "Wallet Connected" : "Wallet not connected"}</span>
                {connected ? (
                    Number(balance) < 0.005 ? (
                        <div><span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span></div>
                    ) : (
                        <div><span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span></div>
                    )
                ) : null}
            </div>
            {!connected ? <div className='mt-12'>Connect your wallet to participate in learn to earn activities. It's important to use a browser that supports the Phantom wallet.</div> : null}
            <CheckNFT />
            <WalletSection withBalace={false} onlyDisconnected={false} />
        </div>
    );
};

export default NftSection;
