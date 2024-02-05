'use client'

import React, { useMemo, useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import CheckNFT from './CheckNFT';
import { motion } from 'framer-motion';
import { NftProvider } from './NftContext'; 

import useIsMobile from "../hooks/helpers";
import HeroSection from './HeroSection';
import QuizComponent from './QuizComponent';
import UserDashboard from './UserDashboard';
import Dashboard from './Dashboard';

require('@solana/wallet-adapter-react-ui/styles.css');





const WalletSection = dynamic(() => import("./WalletSection"), { ssr: false });
const NftSection = dynamic(() => import('./NftSection'), { ssr: false });
// const rpcEndpoint = "https://solana-mainnet.g.alchemy.com/v2/JBQMzv_Tfz9HsMScd8bWP0QgnudE_KDg";
// const rpcEndpoint = "https://rpc.shyft.to?api_key=7n-Eh2jICp6EyLuM";


const rpcEndpoint = "https://api.devnet.solana.com";

// https://devnet-rpc.shyft.to?api_key=7n-Eh2jICp6EyLuM

// https://rpc.shyft.to?api_key=7n-Eh2jICp6EyLuM



const solNetwork = WalletAdapterNetwork.Devnet;

// const solNetwork = WalletAdapterNetwork.Mainnet;







const IndexPage = () => {

    const wallets = useMemo(() => [new PhantomWalletAdapter()], [solNetwork]);
    const umi = createUmi(rpcEndpoint);
    const endpoint = umi.rpc.getEndpoint();


    const [animateHero, setAnimateHero] = useState(false);
    const [animateStats, setAnimateStats] = useState(false);
    const isMobile = useIsMobile();
    const [isHidden, setIsHidden] = useState<boolean>(false);


    // Toggle the animateHero state   

    const handleHeroClick = () => {
        setAnimateHero((prevAnimateHero) => !prevAnimateHero); 
        setAnimateStats((prevAnimateStats) => !prevAnimateStats); 
    };


   
    
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                <NftProvider>

                    <div>Hallo</div>

                </NftProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default IndexPage;
