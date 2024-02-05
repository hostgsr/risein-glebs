// types.ts

import { Umi, PublicKey } from '@metaplex-foundation/umi'; // Replace with actual imports


type AmountIdentifier = 'SOL' | 'USD' | '%' | 'splToken' | string;
type AmountDecimals = number;

export interface Amount<I extends AmountIdentifier = AmountIdentifier, D extends AmountDecimals = AmountDecimals> {
  basisPoints: bigint;
  identifier: I;
  decimals: D;
}

export interface UmiInstance extends Umi {
  customMethod?: () => void;
}



export interface nftData {
  name: string;
  email: string;
  semester: string;
  userName: string;
  points: number;

}

export interface NftContextType {
  hasLoginNFT: boolean;
  setHasLoginNFT: React.Dispatch<React.SetStateAction<boolean>>;
}

