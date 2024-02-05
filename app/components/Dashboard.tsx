import React from 'react';
import { useNftContext } from './NftContext'; // Adjust the path as per your project structure
import { useWallet } from "@solana/wallet-adapter-react";



interface DashboardProps {
    secondDashboard: boolean;
    thirdDashboard: boolean;
}




const Dashboard: React.FC<DashboardProps> = ({secondDashboard, thirdDashboard  }) => {

    const { publicKey ,wallet, connected } = useWallet();


    const nftContext = useNftContext()  ;
    const isNft = nftContext?.hasLoginNFT;


    





    return (
        <div>
           <div>Wallet connected: { wallet ? "Yes" : "No"} </div>  
           <div>Connection: { connected ? "Yes" : "No"} </div>  
           <div>NFTCHECK: { isNft ? "Yes" : "No"} </div>  

        </div>
    );




};

export default Dashboard;