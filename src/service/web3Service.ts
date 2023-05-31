import myTokenBNBABI from '../blockchain/artifacts/MyToken.json';
import myFNFTABI from '../blockchain/artifacts/ERC1155.json';
import { createConfig, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://billowing-omniscient-pond.matic-testnet.discover.quiknode.pro/0dd510cd9e0e5ad9bfdbfeeec2ea432a4f88e59d/' // 👈 Replace this with your HTTP URL from the previous step
      })
    }),
    publicProvider()
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
});

// /**
//  *  Addres de los contratos
//  */
const ADDRESS_CONTRACT_TOKEN_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_TOKEN_BNB_MATIC ??
  '0x62ba02826ef23F4ce9Ac11B72CB31Aadb85878F9';

const ADDRESS_CONTRACT_FNFT_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_FNFT_BNB_MATIC ??
  '0x50b987C93278fef1e273c02B7E300feA469ED246';

const myToken = {
  address: ADDRESS_CONTRACT_TOKEN_BNB_MATIC,
  abi: myTokenBNBABI
};

const FNFT = {
  address: ADDRESS_CONTRACT_FNFT_BNB_MATIC,
  abi: myFNFTABI
};

export { myToken, FNFT, config };
