import { Product } from "@/lib/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CartState {
  cart: Product[];
}

// Define the initial state using that type
const initialState: CartState = {
  cart: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const itemExist = state.cart.find(
        (item) => action.payload.id === item.id
      );
      if (itemExist) {
        const index = state.cart.indexOf(itemExist);
        state.cart[index] = { ...action.payload };
      } else {
        state.cart.push(action.payload);
      }
    },
  },
});

export const { addItem } = counterSlice.actions;

export default counterSlice.reducer;
