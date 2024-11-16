import { createSlice } from '@reduxjs/toolkit';

const initialState = {
items: [],
totalQuantity: 0,
ktotalPrice: 0,
};

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
    addItem(state, action) {
    const newItem = action.payload;
    const existingItem = state.items.find(item => item.id === newItem.id);

    state.totalQuantity++;

    if (!existingItem) {
        state.items.push({
        ...newItem,
        quantity: 1,
        totalPrice: newItem.price,
        });
    } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
    }

    state.totalPrice += newItem.price;
    },
    removeItem(state, action) {
    const id = action.payload;
    const existingItem = state.items.find(item => item.id === id);

    if (existingItem) {
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;

        if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
        } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        }
    }
    },
    clearCart(state) {
    state.items = [];
    state.totalQuantity = 0;
    state.totalPrice = 0;
    },
},
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;