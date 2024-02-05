import React, { createContext, useState, useContext } from 'react';
import { NftContextType } from './types'; 


const NftContext = createContext<NftContextType | null>(null);

export const NftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasLoginNFT, setHasLoginNFT] = useState(false);

    return (
        <NftContext.Provider value={{ hasLoginNFT, setHasLoginNFT }}>
            <p className='hidden'>Has nft login main state: {hasLoginNFT ? "true" :" false" } </p>
            {children}
        </NftContext.Provider>
    );
};

export const useNftContext = (): NftContextType | null => useContext(NftContext);
