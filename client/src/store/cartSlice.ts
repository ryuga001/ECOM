import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ProductType {
    id: string,
    name: string,
    quantity: number,
    price: number,
    imgUrl: string,

}
export interface ReomveType {
    id: string,
}

export interface InitialStateType {
    cartProduct: ProductType[],
}

const initialState: InitialStateType = {
    cartProduct: [],
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.cartProduct.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.cartProduct = state.cartProduct.filter((item) => item.id !== (action.payload))
        }
    }
});

export const { addProduct, removeProduct } = CartSlice.actions;
export default CartSlice.reducer;