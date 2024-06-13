import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserDataType, UserType } from "../types/alltypes";

const initialState: UserType = {
    user: {
        id: (sessionStorage.getItem("id") || ""),
        username: (sessionStorage.getItem("username") || ""),
        email: (sessionStorage.getItem("email") || ""),
        profileImage: (sessionStorage.getItem("profileImage") || ""),
        role: (sessionStorage.getItem("role") || "user"),

    }
}
// function getCookieValue(name: string) {
//     const nameEQ = name + "=";
//     const ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
// }
export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDataType>) => {
            state.user = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                profileImage: action.payload.profileImage,
                role: action.payload.role,
            }
        }
    }
})

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;