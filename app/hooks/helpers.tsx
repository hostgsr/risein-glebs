import { useState, useEffect } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Update the state to determine if it's mobile or not
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Set initial value on client-side
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 1024);
            window.addEventListener('resize', handleResize);
        }

        // Cleanup
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    return isMobile;
};



function formatPublicKey(pubKey: string): string {
    if (pubKey.length <= 10) {
      return pubKey;
    }
    
    return `${pubKey.substring(0, 5)}...${pubKey.substring(pubKey.length - 5)}`;
  }



export default useIsMobile;



