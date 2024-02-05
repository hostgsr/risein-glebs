'use client'

// Import necessary React and Next.js components and libraries
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

// Import CSS styles
require('@solana/wallet-adapter-react-ui/styles.css');

// Dynamically import components with Next.js
const WalletSection = dynamic(() => import("./WalletSection"), { ssr: false });
const NftSection = dynamic(() => import('./NftSection'), { ssr: false });
const Dashboard = dynamic(() => import('./Dashboard'), { ssr: false });

// Define the Solana RPC endpoint and network
const rpcEndpoint = "https://api.devnet.solana.com";
const solNetwork = WalletAdapterNetwork.Devnet;

// Define the main component
const IndexPage = () => {
    // Initialize wallet adapters and other variables
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

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

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (animateHero) {
          timeout = setTimeout(() => setIsHidden(true), 500); // Delay of 0.5 seconds
        } else {
          setIsHidden(false);
        }
    
        return () => clearTimeout(timeout);
      }, [animateHero]);

    // Define animation variants
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      };
      
      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

    // Render the main component
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                <NftProvider>
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className=''
                    >
                        <section className=' flex  flex-col px-5 pt-5  lg:flex-row w-full gap-5'>

                            {/* Hero Section */}
                            <motion.div 
                                animate={animateHero ?  
                                    { 
                                        width: isMobile ? "100%" : "0",
                                        height: isMobile ? "0" : "auto",
                                        opacity:"0",
                                        padding:"0",
                                    } 
                                    : 
                                    { 
                                        width: isMobile ? "100%" : "50%",
                                        height: isMobile ? "100%" : "auto",
                                        opacity:"1",
                                        padding:"",
                                    }
                                }
                                transition={{ padding:{duration:0.1}, opacity: { duration: 0.1 }, height: { duration: 0.5 }, width:{duration:0.5} }}
                                key={1} 
                                className={`w-full 	 flex-shrink lg:h-[450px]  border-black border rounded-[30px] bg-black lg:w-1/2 ${isHidden ? 'hidden' : ''}   `} 
                                variants={item }> 
                                <HeroSection onClick={handleHeroClick}></HeroSection>
                            </motion.div>

                            {/* NFT Section */}
                            <motion.div 
                                key={2} 
                                className=" w-full  flex-shrink	lg:h-[450px]  rounded-[30px] background-image-2 text-white   lg:w-1/4" 
                                variants={item}
                                animate={animateHero ?  
                                    { 
                                        width: isMobile ? "100%" : "50%",
                                    } 
                                    : 
                                    { 
                                        width: isMobile ? "100%" : "25%",
                                    }
                                }
                                transition={{ padding:{duration:0.1}, opacity: { duration: 0.1 }, height: { duration: 0.5 }, width:{duration:0.5} }}
                            > 
                                <NftSection fullWidth={animateHero} />  
                            </motion.div>

                            {/* Annotation Section */}
                            <motion.div
                                key={3} 
                                className=" w-full   flex-shrink lg:h-[450px]  border-black border rounded-[30px] bg-black text-white	 lg:w-1/4" 
                                variants={item}
                                animate={animateHero ?  
                                    { 
                                        width: isMobile ? "100%" : "50%",
                                    } 
                                    : 
                                    { 
                                        width: isMobile ? "100%" : "25%",
                                    }
                                }
                                transition={{ padding:{duration:0.1}, opacity: { duration: 0.1 }, height: { duration: 0.5 }, width:{duration:0.5} }}
                            > 
                               <div className='p-5'>
                                <span className='border border-white py-1 px-5 block w-fit mb-5 rounded-full '>Annotation</span>
                                Welcome to the project, a platform that simplifies dashboard access with a unique login system. Users create a login token, save it in their wallet, and use it for future authentications. This approach ensures secure and effortless interaction with the dashboard, offering a seamless experience for managing personal access rights.
                               </div>
                               {/* <WalletSection  withBalace={true} onlyDisconnected={true} /> */}
                            </motion.div>

                        </section>

                        <section  className='flex flex-col py-5 px-5  lg:flex-row w-full gap-5'>

                            {/* User Dashboard Section */}
                            <motion.div
                                animate={animateHero ?  
                                    { 
                                        width: isMobile ? "100%" : "75%",
                                    } 
                                    : 
                                    { 
                                        width: isMobile ? "100%" : "50%",
                                    }
                                }
                                transition={{  width:{duration:0.5} }}
                                key={4} 
                                className=" w-full  box-border  background-image  rounded-[30px]  text-white flex-shrink lg:w-1/2" 
                                variants={item}
                            > 
                                <UserDashboard secondDashboard={false} thirdDashboard={false}/>
                            </motion.div>

                            {/* Instructions Section */}
                            <motion.div 
                                animate={animateHero ?  
                                    { 
                                        width: isMobile ? "100%" : "25%",
                                    } 
                                    : 
                                    { 
                                        width: isMobile ? "100%" : "25%",
                                    }
                                }
                                transition={{  width:{duration:0.5} }}
                                key={5} 
                                className=" w-full  flex-shrink	lg:h-[450px] p-5  lg:sticky lg:top-56  rounded-[30px]  background-image  text-white lg:w-1/4" 
                                variants={item}
                            > 
                                <p className='border-white rounded-full border py-1 w-fit px-5 mb-5'>Instructions</p>
                                <p>- Use Chrome Based Browser</p>
                                <p>- Install Phantom Wallet</p>
                                <p>- In case you see red dot, be sure your wallet is loaded with some SOL&apos;</p>
                                <p>- Refresh page after minting</p>

                                <p className='mt-12'>
                                This is just a brief workaround demonstrating how login functionality can be implemented based on NFTs created by the user. Its driven by fun and exploration of front-end Web3 technologies.
                                </p>
                            </motion.div>

                            {/* Footer Section */}
                            <motion.div
                                animate={animateHero ?  
                                    { 
                                        width: isMobile ? "100%" : "0",
                                        opacity:"0",
                                        padding:"0",
                                    } 
                                    : 
                                    { 
                                        width: isMobile ? "100%" : "25%",
                                        opacity:"1",
                                        padding:"",
                                    }
                                }
                                transition={{  width:{duration:0.5} }}
                                key={6} 
                                className={`w-full  flex-shrink lg:h-[450px] lg:sticky lg:top-56  relative  text-white lg:w-1/4 ${isHidden ? 'hidden' : ''}   `} 
                                variants={item}
                            > 
                                <p className='absolute hidden lg:block bottom-0 right-0'>
                                Developed for RiseIn <br></br>
                                by Gleb Savelev
                                </p>
                            </motion.div>

                        </section>
                    </motion.div>
                </NftProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default IndexPage;
