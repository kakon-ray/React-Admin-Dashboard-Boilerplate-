import { configureStore } from "@reduxjs/toolkit";
import  categoryDetails  from "../features/categoryDetailsSlice";
import  subCategoryDetails  from "../features/subCategorySlice";
import ProductDetails from "../features/productsDetailsSlice";
import userDetails from "../features/userDetailsSlice";




export const store = configureStore({
  reducer: {
    category:categoryDetails,
    subcategory:subCategoryDetails,
    products:ProductDetails,
    users:userDetails,
  },
});