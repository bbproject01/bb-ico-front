import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ITokenBNB {
  name: string;
  addressToken: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
}

const initialState: ITokenBNB = {
  addressToken: '',
  decimals: '',
  name: '',
  symbol: '',
  totalSupply: ''
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
    }
  }
});

export const {
  setAddressToken,
  setDecimals,
  setName,
  setSymbol,
  setTotalSupply
} = tokenSlice.actions;

export default tokenSlice.reducer;
