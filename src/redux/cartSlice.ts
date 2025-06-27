import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  totalQuantity: number;
}

const initialState: CartState = {
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setQuantity: (state, action: PayloadAction<number>) => {
      state.totalQuantity = action.payload;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.totalQuantity += action.payload;
    },
  },
});

export const { setQuantity, incrementBy } = cartSlice.actions;
export default cartSlice.reducer;
 