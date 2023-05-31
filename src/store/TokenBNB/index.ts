import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';

export interface ITokenBNB {
  name: string;
  addressToken: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  owner: string;
  balanceFrom: BigNumber;
  balance: BigNumber;
}

const initialState: ITokenBNB = {
  addressToken: '',
  decimals: '',
  name: '',
  symbol: '',
  totalSupply: '',
  owner: '',
  balance: BigNumber.from(0),
  balanceFrom: BigNumber.from(0)
};

const tokenSlice = createSlice({
  name: 'tokenBNB',
  initialState,
  reducers: {
    setAddressToken: (state, action: PayloadAction<string>) => {
      state.addressToken = action.payload;
    },
    setDecimals: (state, action: PayloadAction<string>) => {
      state.decimals = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    setTotalSupply: (state, action: PayloadAction<string>) => {
      state.totalSupply = action.payload;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setBalance: (state, action: PayloadAction<BigNumber>) => {
      state.balance = action.payload;
    },
    setBalanceFrom: (state, action: PayloadAction<BigNumber>) => {
      state.balanceFrom = action.payload;
    }
  }
});

export const {
  setAddressToken,
  setDecimals,
  setName,
  setSymbol,
  setTotalSupply,
  setOwner,
  setBalance,
  setBalanceFrom
} = tokenSlice.actions;

export default tokenSlice.reducer;
