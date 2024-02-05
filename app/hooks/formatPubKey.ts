export function formatPublicKey(pubKey: string): string {
    if (pubKey.length <= 10) {
      return pubKey;
    }
    
    return `${pubKey.substring(0, 5)}...${pubKey.substring(pubKey.length - 5)}`;
}


