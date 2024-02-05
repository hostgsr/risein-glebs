import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { mplToolbox, fetchAllMintByOwner } from '@metaplex-foundation/mpl-toolbox';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import { UmiInstance, nftData } from './types'; 
import { useNftContext } from './NftContext'; 
import DashboardIntro from './DashboardIntro';
import QuizComponent from './QuizComponent';

import { generateSigner, percentAmount, unwrapOption, publicKey, sol, createGenericFileFromBrowserFile } from '@metaplex-foundation/umi'


import {
    updateV1,
    fetchMetadataFromSeeds,
  } from '@metaplex-foundation/mpl-token-metadata'

interface UserDashboardProps {
    secondDashboard: boolean;
    thirdDashboard: boolean;
}

const UserDashboard: React.FC<UserDashboardProps> = ({secondDashboard, thirdDashboard}) => {
    const { publicKey, wallet, connected } = useWallet();
    const [umi, setUmi] = useState<UmiInstance | null>(null);
    const [loginNFTFound, setLoginNFTFound] = useState(false);
    const [nftData, setNftData] = useState<nftData | null>(null); 
    const [nftPublicKey, setNftPublicKey] = useState<string | null>(null); 
    const rpcEndpoint = clusterApiUrl('devnet');
    const [loading, setLoading] = useState(false); 

    const nftContext = useNftContext();

    useEffect(() => {
        if (wallet && connected) {
            const umiInstance = createUmi(rpcEndpoint)
                .use(walletAdapterIdentity(wallet.adapter))
                .use(mplToolbox());
            setUmi(umiInstance);
        }
    }, [wallet, connected, rpcEndpoint]);

    useEffect(() => {
        const getMetadata = async () => {
            if (!umi || !publicKey) return;

            setLoading(true); 

            try {
                const owner = new PublicKey(publicKey);
                const mintsFromOwner = await fetchAllMintByOwner(umi, owner as any);

                for (let mint of mintsFromOwner) {
                    const metadata = await fetchDigitalAsset(umi, mint.publicKey);
                    if (metadata && metadata.metadata.name === "LoginNFT") {
                        console.log("LoginNFT found:", mint.publicKey.toString());

                        const response = await fetch(metadata.metadata.uri);
                        const json = await response.json();
                        setNftData(json); 
                        setNftPublicKey(mint.publicKey.toString()); 

                        setLoginNFTFound(true);
                        if (nftContext) {
                            const { setHasLoginNFT } = nftContext;
                            if (setHasLoginNFT) {
                                setHasLoginNFT(true);
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
    }, [umi, publicKey, wallet, connected]);

    const isNft = nftContext?.hasLoginNFT;

    if (!connected) {
        return <div className='text-center h-full w-full '>No wallet no dashboard</div>;
    }


    // Handle the changing of a  NFT metadata, Idea is to change uri metadata to give user points based on user answers. If all answers correct user can change his nft, get points. 
    // Then his points will be displayed in dashboard and he will open new section based on points he has. ALternative could be minting new NFT so user can acces new sections.
    // const handleChangeNFT = async () => {
    //     if (!umi) return;

    //     try {

    //         const updateAuthority = umi.payer

    //         const mint = nftPublicKey;
    //         //@ts-ignore I know that I pass mint publickkey
    //         const initialMetadata = await fetchMetadataFromSeeds(umi, { mint })
    //         await updateV1(umi, {
    //           //@ts-ignore I know that I pass mintpublickkey, but still can improve
    //           mint,
    //           authority: updateAuthority,
    //           data: { ...initialMetadata,  name:"updates assets", uri: uri  },
    //         }).sendAndConfirm(umi)
            
    //     } catch (error) {
    //         console.error("Error changing NFT:", error);
    //     }
    // };




    return (
        <div className='px-5 py-12 h-full flex flex-col'>
            {isNft ? (
                <div> {nftData && nftPublicKey && connected && (
                    <div>
                        <QuizComponent  />
                        {/* <button className=' w-fit h-fit border-white rounded-full border py-1 px-5 ' onClick={handleChangeNFT}>
                                Change
                        </button>     */}
                    </div>
                )}
                </div>
            ) : (
                <DashboardIntro />
            )}
        </div>
    );
};

export default UserDashboard;
