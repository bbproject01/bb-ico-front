import myTokenBNBABI from '../blockchain/artifacts/MyToken.json';
import { createConfig, configureChains, mainnet } from 'wagmi';
import { goerli, polygonMumbai } from 'wagmi/chains';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, goerli, mainnet],
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
const ADDRESS_CONTRACT_TOKEN_BNB_GOERLI =
  process.env.ADDRESS_CONTRACT_TOKEN_BNB_GOERLI ??
  '0xc72E66D079a4387A6c6cFfe8B07AB205a2E2a600';

const ADDRESS_CONTRACT_TOKEN_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_TOKEN_BNB_MATIC ??
  '0x012e8Bb9950B72Fbecb8829B553249b3D24b0042';

const myToken = {
  address_goerli: ADDRESS_CONTRACT_TOKEN_BNB_GOERLI,
  address_matic: ADDRESS_CONTRACT_TOKEN_BNB_MATIC,
  abi: myTokenBNBABI
};

export { myToken, config };
