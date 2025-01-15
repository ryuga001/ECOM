import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserDataType, UserType } from "../types/alltypes";


const getSessionStorageValue = (key: string, defaultValue: string = ""): string => {
    return sessionStorage.getItem(key) || defaultValue;
};


const initialState: UserType = {
    user: {
        id: getSessionStorageValue("id"),
        username: getSessionStorageValue("username"),
        email: getSessionStorageValue("email"),
        profileImage: getSessionStorageValue("profileImage"),
        role: getSessionStorageValue("role", "user"),
    },
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUser: (state, action: PayloadAction<UserDataType>) => {
            const { id, username, email, profileImage, role } = action.payload;
            state.user = { id, username, email, profileImage, role };
        },
        clearUser: (state) => {
            state.user = {
                id: "",
                username: "",
                email: "",
                profileImage: "",
                role: "user",
            };
        },
    }
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;