import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const user = JSON.parse(localStorage.getItem('admin'));
const token = user?.token


export const showUser = createAsyncThunk('showUser', async (args, { rejectWithValue }) => {
    const response = await fetch("https://andshop.web-builderit.com/api/admin/vendor/manage", {
        headers: {
            Authorization: 'Bearer' + ' ' + token,
        },
    });
    try {
        const result = await response.json()
        return result.users;

    } catch (error) {
        return rejectWithValue(error)
    }
})


const UserDetails = createSlice({
    name: "UserDetails",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder


            //   show User
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })



    },



})

export default UserDetails.reducer;