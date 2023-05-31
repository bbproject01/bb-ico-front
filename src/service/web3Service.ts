import myTokenBNBABI from '../blockchain/artifacts/MyToken.json';
import myFNFTABI from '../blockchain/artifacts/ERC1155.json';
import { createConfig, configureChains, mainnet } from 'wagmi';
import { goerli, polygonMumbai } from 'wagmi/chains';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, polygonMumbai, mainnet],
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
  '0x6B8b0A858A48E4870A047E97bDD3e5d897d8d0fE';

const ADDRESS_CONTRACT_TOKEN_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_TOKEN_BNB_MATIC ??
  '0x692CBc136E2eF0BC9ebfa57A53F66F210171d7A3';

const ADDRESS_CONTRACT_ERC1155_BNB_MATIC =
  process.env.ADDRESS_CONTRACT_ERC1155_BNB_MATIC ??
  '0xa790F4938e4Daf439674085C0c335C0eb49aE5e4';

const myToken = {
  goerli: ADDRESS_CONTRACT_TOKEN_BNB_GOERLI,
  mumbai: ADDRESS_CONTRACT_TOKEN_BNB_MATIC,
  // address: ADDRESS_CONTRACT_TOKEN_BNB_MATIC,
  abi: myTokenBNBABI
};

const ERC1155 = {
  address: ADDRESS_CONTRACT_ERC1155_BNB_MATIC,
  abi: myFNFTABI
};

export { myToken, ERC1155, config };
