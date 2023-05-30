import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ITokenBNB {
  selectedMenuOption: number;
}

const initialState: ITokenBNB = {
  selectedMenuOption: 0
};

const dashboardSlice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setSelectedMenuOption: (state, action: PayloadAction<number>) => {
      state.selectedMenuOption = action.payload;
    }
  }
});

export const { setSelectedMenuOption } = dashboardSlice.actions;

export default dashboardSlice.reducer;
