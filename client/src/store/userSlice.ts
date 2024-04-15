import { PayloadAction, createSlice } from "@reduxjs/toolkit"




export interface UserDataType {
    id: string,
    username: string,
    email: string,
    profileImage: string,
    role?: string,
}
export interface UserType {
    user: UserDataType,
}
const initialState: UserType = {
    user: {
        id: "",
        username: "",
        email: "",
        profileImage: "",
        role: "user",
    }
}

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