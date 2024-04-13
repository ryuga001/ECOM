import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProductType {
    id: string,
    name: string,
    quantity: number,
    price: number,
    imgUrl: string,
}

export interface InitialState {
    cartProduct: Array<ProductType>,
}

const initialState: InitialState = {
    cartProduct: []
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.cartProduct.push(action.payload)
        }
    }
});

export const { addProduct } = CartSlice.actions;
export default CartSlice.reducer;