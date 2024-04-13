import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
export const store = configureStore({
    reducer: (
        cartReducer
    )
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>