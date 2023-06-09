import { type BigNumber } from 'ethers';

export interface IFNFTMetadataStruct {
  maximumReduction: BigNumber;
  originalTerm: BigNumber;
  timePassed: BigNumber;
}
