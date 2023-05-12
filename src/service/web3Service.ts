import myTokenBNBABI from '../blockchain/artifacts/MyToken.json';

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

export { myToken };
