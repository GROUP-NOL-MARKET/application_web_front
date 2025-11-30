import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Components/Authentification/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (sousCategory) => {
    const response = await API.get("/products", {
      params: { sous_category: sousCategory },
    });

    return {
      sousCategory,
      data: response.data.data,
    };
  }
);

export const fetchHomeProducts = createAsyncThunk(
  "products/fetchHomeProducts",
  async ({ category }) => {
    const response = await API.get("/products", {
      params: { category, page: 1 },
    });

    return {
      category,
      data: response.data.data,
    };
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    items: {},
    home: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.home[category] = data; // store 12 products
      })

      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { sousCategory, data } = action.payload;
        state.items[sousCategory] = data;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductsSlice.reducer;
