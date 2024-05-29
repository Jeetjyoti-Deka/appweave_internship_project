import { Product } from "@/lib/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FilterState {
  color: "red" | "green" | "blue" | "";
  gender: "male" | "female" | "";
  type: "basic" | "hoodie" | "polo" | "";
  price: "0-250" | "251-450" | "above" | "";
}

// Define the initial state using that type
const initialState: FilterState = {
  color: "",
  gender: "",
  type: "",
  price: "",
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<FilterState["color"]>) => {
      state.color = action.payload;
    },
    setGender: (state, action: PayloadAction<FilterState["gender"]>) => {
      state.gender = action.payload;
    },
    setType: (state, action: PayloadAction<FilterState["type"]>) => {
      state.type = action.payload;
    },
    setPrice: (state, action: PayloadAction<FilterState["price"]>) => {
      state.price = action.payload;
    },
    removeFilters: (state) => {
      state = {
        color: "",
        gender: "",
        type: "",
        price: "",
      };
      return state;
    },
  },
});

export const { setColor, setGender, setPrice, setType, removeFilters } =
  counterSlice.actions;

export default counterSlice.reducer;
