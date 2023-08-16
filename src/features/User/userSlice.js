import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const {REACT_APP_BASE_API_URL} = process.env;

export const loginAsync = createAsyncThunk(
    'user/loginAsync',
    async (data, thunkAPI) =>{
        return await axios.post(`${REACT_APP_BASE_API_URL}/account/login`, data)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)

export const registerAsync = createAsyncThunk(
    'user/registerAsync',
    async (data, thunkAPI) =>{
        return await axios.post(`${REACT_APP_BASE_API_URL}/account/register`, data)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)

export const isEmailUnique = createAsyncThunk(
    'user/isEmailUnique',
    async (email, thunkAPI) =>{
        return await axios.post(`${REACT_APP_BASE_API_URL}/account/isEmailUnique?email=${email}`)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)

export const isUsernameUnique = createAsyncThunk(
    'user/isUsernameUnique',
    async (username, thunkAPI) =>{
        return await axios.post(`${REACT_APP_BASE_API_URL}/account/isUsernameUnique?username=${username}`)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)

export const getUserDetailsAsync = createAsyncThunk(
    'user/getUserDetailsAsync',
    async (thunkAPI) =>{
        return await axios.get(`${REACT_APP_BASE_API_URL}/user/userDetails`, 
            {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)


export const updateUserDetailsAsync = createAsyncThunk(
    'user/updateUserDetailsAsync',
    async (data, thunkAPI) =>{
        return await axios.put(`${REACT_APP_BASE_API_URL}/user/updateUserDetails`, data)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
        imageURL: null,
        authed: false,
        userDetails: {},
        shoppingCart: [],
        status: null,
        error: null
    },
    reducers:{
        // Account
        login: (state) =>{
            state.authed = true;
        },
        logout: (state) => {
            state.authed = false;
            window.sessionStorage.removeItem("Token")
        },
        uploadPicture: (state, action) =>{
            state.imageURL = action.payload
        },
        resetStatus: (state) =>{
            state.status = null;
            state.error = null;
        },

        // Shopping Cart
        addToCart: (state, {payload}) => {
            if(state.shoppingCart.some(item=> item.productId === payload.productId)){
                state.shoppingCart.forEach(item=>{
                    if(item.productId === payload.productId){
                        item.quantity += payload.quantity
                    }
                })
            }else{
                state.shoppingCart.push(payload)
            }
        },
        removeFromCart: (state, {payload}) => {
            state.shoppingCart.splice(payload, 1)
        },
        updateQuantity: (state, {payload}) => {
            state.shoppingCart.forEach(item=>{
                if(item.productId === payload.productId){
                    item.quantity = payload.count
                    item.price = item.pricePerUnit * item.quantity
                }
                }
            )
        }
    },
    extraReducers:{
        // Account Login
        [loginAsync.pending] : (state, action) =>{
            state.status = 'loading'
        },
        [loginAsync.fulfilled] : (state, {payload}) =>{
            state.status = 'success'
            if(payload.token){
                window.sessionStorage.setItem("token", payload.token)
                state.username = payload.username
                state.authed = true
            }
        },
        [loginAsync.rejected] : (state, {payload}) =>{
            state.status = 'rejected'
            state.error = payload ? payload.message : 'Login falhou. Por favor tente mais tarde'
        },

        // Account Register
        [registerAsync.pending] : (state, action) =>{
            state.status = 'loading'
        },
        [registerAsync.fulfilled] : (state, {payload}) =>{
            console.log(payload)
            state.status = 'success'
            if(payload.token){
                window.sessionStorage.setItem('token', payload.token)
                state.username = payload.username
                state.authed = true
            }
        },
        [registerAsync.rejected] : (state, {payload}) =>{
            state.status = 'rejected'
            state.error = payload ? payload.message : 'Registo falhou. Por favor tente mais tarde'
        },

        // Account Details
        [getUserDetailsAsync.pending] : (state, action) =>{
            state.status = 'loading'
        },
        [getUserDetailsAsync.fulfilled] : (state, {payload}) =>{
            state.status = 'success'
            state.userDetails = payload
        },
        [getUserDetailsAsync.rejected] : (state, {payload}) =>{
            state.status = 'rejected'
            state.error = payload ? payload.message : 'Alteração falhou. Por favor tente mais tarde'
        }
        // [isEmailUnique.pending] : (state, action) =>{
        //     state.status = 'loading'
        // },
        // [isEmailUnique.fulfilled] : (state, {payload}) =>{
        //     state.status = 'success'
        // },
        // [isEmailUnique.rejected] : (state, {payload}) =>{
        //     state.status = 'rejected'
        // },
        // [isUsernameUnique.pending] : (state, action) =>{
        //     state.status = 'loading'
        // },
        // [isUsernameUnique.fulfilled] : (state, {payload}) =>{
        //     state.status = 'success'
        // },
        // [isUsernameUnique.rejected] : (state, {payload}) =>{
        //     state.status = 'rejected'
        // }
    }
});

export const 
    {
        login,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        uploadPicture,
        resetStatus
    } = userSlice.actions;

export const userSelector = state => state.user

export default userSlice.reducer;


