import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const user = JSON.parse(localStorage.getItem('admin'));
const token = user?.token



export const showProduct = createAsyncThunk('showProduct', async (args, { rejectWithValue }) => {
    const response = await fetch("https://andshop.web-builderit.com/api/admin/product/manage", {
        headers: {
            Authorization: 'Bearer' + ' ' + token,
        },
    });
    try {
        const result = await response.json()
        return result.products;
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const deleteProduct = createAsyncThunk("deleteProduct", async (id, { rejectWithValue }) => {
    // console.log(id)
  const response = await fetch(
      `https://andshop.web-builderit.com/api/admin/product/delete/${id}`, {
        method: "GET",
        headers: {
            Authorization: 'Bearer' + ' ' + token,
        },
    });

  try {
      const result = await response.json();
      return result;

  } catch (error) {
      return rejectWithValue(error)
  }


}
);


const ProductDetails = createSlice({
    name: "ProductDetails",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
    
            //   show Product
            .addCase(showProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(showProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(showProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //   delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.id) {
                  state.products = state.products.filter((item) => parseInt(item.id) !== parseInt(action.payload.id));
                }

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to delete Product!');
            });


    },



})

export default ProductDetails.reducer;