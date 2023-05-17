/* eslint-disable @typescript-eslint/consistent-type-imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Login {
  email: string;
  password: string;
}
export interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setAccessToken, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
