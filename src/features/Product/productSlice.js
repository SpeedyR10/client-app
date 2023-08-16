import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const {REACT_APP_BASE_API_URL} = process.env;

export const getProductsAsync = createAsyncThunk(
    'product/getProductsAsync',
    async (thunkAPI) =>{
        return await axios.get(`${REACT_APP_BASE_API_URL}/Products/get`)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)

export const getProductsByIdAsync = createAsyncThunk(
    'product/getProductsByIdAsync',
    async (productId, thunkAPI) =>{
        return await axios.get(`${REACT_APP_BASE_API_URL}/Products/getById?productId=${productId}`)
            .then((res)=>res.data)
            .catch((err)=>thunkAPI.rejectWithValue(err.response.data))
    }
)


export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        products: [],
        status: null
    },
    reducers:{
        getProducts: (state, action) =>{
            state.products = action.payload
        }
    },
    extraReducers:{
        // Get Products
        [getProductsAsync.pending] : (state, action) =>{
            state.status = 'loading'
        },
        [getProductsAsync.fulfilled] : (state, {payload}) =>{
            state.status = 'success'
            state.products = payload.products
            
        },
        [getProductsAsync.rejected] : (state, {payload}) =>{
            state.status = 'rejected'
            state.error = payload.message
        },

        // Get Product By Id 
        [getProductsByIdAsync.pending] : (state, action) =>{
            state.status = 'loading'
        },
        [getProductsByIdAsync.fulfilled] : (state, {payload}) =>{
            state.status = 'success'
            state.product = payload.product
        },
        [getProductsByIdAsync.rejected] : (state, {payload}) =>{
            state.status = 'rejected'
            state.error = payload.message
        }
    }
});

export const {getProducts} = productSlice.actions;

export const productSelector = state => state.product

export default productSlice.reducer;