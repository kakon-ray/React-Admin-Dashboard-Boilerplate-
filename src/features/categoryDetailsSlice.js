import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const user = JSON.parse(localStorage.getItem('admin'));
const token = user?.token

export const createCategory = createAsyncThunk("createCategory", async (data, { rejectWithValue }) => {

    const response = await fetch(
        "https://andshop.web-builderit.com/api/admin/category/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer' + ' ' + token,
            },
            body: JSON.stringify(data),
        }
    );

    try {
        const result = await response.json();
    //    console.log(result)
        return result;

    } catch (error) {
        return rejectWithValue(error)
    }


}
);


export const showCategory = createAsyncThunk('showCategory', async (args, { rejectWithValue }) => {
    const response = await fetch("https://andshop.web-builderit.com/api/admin/category/show", {
        headers: {
            Authorization: 'Bearer' + ' ' + token,
        },
    });
    try {
        const result = await response.json()
        return result.categories;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateCategory = createAsyncThunk("updateCategory", async (data, { rejectWithValue }) => {
    //   console.log(data)
    const response = await fetch(
        `https://andshop.web-builderit.com/api/admin/category/edit`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer' + ' ' + token,
            },
            body: JSON.stringify(data),
        }
    );

    try {
        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error)
    }


}
);

export const deleteCategory = createAsyncThunk("deleteCategory", async (id, { rejectWithValue }) => {
    // console.log(id)
  const response = await fetch(
      `https://andshop.web-builderit.com/api/admin/category/delete/${id}`, {
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


const categoryDetails = createSlice({
    name: "categoryDetails",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // create category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload.data);
                toast.success(action.payload.msg);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to create Category!');
            })

            //   show category
            .addCase(showCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(showCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(showCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //   update category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                console.log(action.payload.data)
                state.loading = false;
                state.categories = state.categories.map((item) =>
                    item.id === action.payload.id ? action.payload.data : item 
                  );
                  toast.success('Category update successfully!');
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to update Category!');
            })
            //   delete category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.id) {
                  state.categories = state.categories.filter((item) => item.id != action.payload.id);
                }
                toast.success(action.payload.msg);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to delete Category!');
            });


    },



})

export default categoryDetails.reducer;