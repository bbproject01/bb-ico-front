import myTokenBNBABI from '../blockchain/artifacts/MyToken.json';
import myFNFTABI from '../blockchain/artifacts/ERC1155.json';
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
const ADDRESS_CONTRACT_TOKEN_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_TOKEN_BNB_MATIC ??
  '0x5080b3ab6a3B5e8893F085B33696d74d1377B5c8';

const ADDRESS_CONTRACT_ERC1155_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_ERC1155_BNB_MATIC ??
  '0xa790F4938e4Daf439674085C0c335C0eb49aE5e4';

const myToken = {
  address: ADDRESS_CONTRACT_TOKEN_BNB_MATIC,
  abi: myTokenBNBABI
};

const ERC1155 = {
  address: ADDRESS_CONTRACT_ERC1155_BNB_MATIC,
  abi: myFNFTABI
};

export { myToken, ERC1155, config };
