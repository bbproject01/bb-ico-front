import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ITokenBNB {
  name: string;
  address: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
}

const initialState: ITokenBNB = {
  address: '',
  decimals: '',
  name: '',
  symbol: '',
  totalSupply: ''
};

const tokenSlice = createSlice({
  name: 'tokenBNB',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
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

export const { setAddress, setDecimals, setName, setSymbol, setTotalSupply } =
  tokenSlice.actions;

export default tokenSlice.reducer;
