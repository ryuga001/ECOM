import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ProductType {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imgUrl: string;
}


export interface InitialStateType {
    cartProduct: ProductType[];
}


const initialState: InitialStateType = {
    cartProduct: [],
};


export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addProduct: (state, action: PayloadAction<ProductType>) => {
            const existingProduct = state.cartProduct.find(
                (product) => product.id === action.payload.id
            );
            if (existingProduct) {

                existingProduct.quantity += action.payload.quantity;
            } else {

                state.cartProduct.push(action.payload);
            }
        },

        removeProduct: (state, action: PayloadAction<string>) => {
            state.cartProduct = state.cartProduct.filter(
                (product) => product.id !== action.payload
            );
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const product = state.cartProduct.find(
                (item) => item.id === action.payload.id
            );
            if (product) {
                product.quantity = action.payload.quantity;
            }
        },

        clearCart: (state) => {
            state.cartProduct = [];
        },
    },
});

// Export actions and reducer
export const { addProduct, removeProduct, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
