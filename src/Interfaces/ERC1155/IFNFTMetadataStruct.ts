import { type BigNumber } from 'ethers';

export interface IFNFTMetadataStruct {
  blocked: boolean;
  blockDate: BigNumber;
  originalTerm: BigNumber;
  createDate: BigNumber;
  timePassed: BigNumber;
  maximumReduction: BigNumber;
}
