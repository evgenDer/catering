import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateFromApi: (state, { payload: { items } }) => ({
      items: [
        ...items,
      ],
    }),
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToCart: (state, action) => {
      const { items } = state;
      const { payload: product } = action;
      const existingItem = items.find((i) => i.product.id === product.id);
      if (existingItem) {
        existingItem.count++;
        return;
      }
      items.push({ product, count: 1 });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeFromCart: (state, action) => {
      const { items } = state;
      const { payload: product } = action;
      const existingItem = items.find((i) => i.product.id === product.id);
      if (!existingItem) return;
      if (existingItem.count > 1) {
        existingItem.count--;
        return;
      }
      state.items = items.filter((i) => i.product.id !== product.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const addToCart = (product) => async (dispatch) => {
  dispatch(cartSlice.actions.addToCart(product));
};

export const removeFromCart = (product) => async (dispatch) => {
  dispatch(cartSlice.actions.removeFromCart(product));
};

export const clearCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.clearCart());
};

export const { updateFromApi } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
