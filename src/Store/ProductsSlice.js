import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Components/Authentification/api";

/*
 * FETCH PAR SOUS-CATEGORIE (produits normaux)
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (sousCategory, { rejectWithValue }) => {
    try {
      const response = await API.get("/products", {
        params: { sous_category: sousCategory },
      });

      return {
        sousCategory,
        data: response.data.data,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/*
 * FETCH LIMITE PAR CATEGORIE (utilise le nouvel endpoint sûr)
 */
export const fetchLimitedProducts = createAsyncThunk(
  "products/fetchLimited",

  async ({ category, limit = 10 }, { rejectWithValue }) => {
    try {
      const resp = await API.get("/products-category/limited", {
        params: { category, limit },
      });

      return { category, items: resp.data.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/*
 * FETCH PRODUITS POUR ACCUEIL (catégories principales)
 */
export const fetchHomeProducts = createAsyncThunk(
  "products/fetchHomeProducts",
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await API.get("/products", {
        params: { category, page: 1 },
      });

      return {
        category,
        data: response.data.data,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/*
 * SLICE
 */
const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    items: {},                 // items[category]
    statusByCategory: {},      // statusByCategory[category]
    errorByCategory: {},       // errorByCategory[category]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /*
       * HOME PRODUCTS
       */
      .addCase(fetchHomeProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.home[category] = data;
        state.status = "succeeded";
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      })

      /*
       * FETCH NORMAL PAR SOUS-CATEGORIE
       */
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
        state.error = action.payload?.message || action.error.message;
      })

      /*
       * FETCH LIMITE PAR CATEGORIE
       */
      .addCase(fetchLimitedProducts.pending, (state, action) => {
        const { category } = action.meta.arg;
        state.statusByCategory[category] = "loading";
      })

      .addCase(fetchLimitedProducts.fulfilled, (state, action) => {
        const { category, items } = action.payload;
        state.items[category] = items;
        state.statusByCategory[category] = "succeeded";
      })

      .addCase(fetchLimitedProducts.rejected, (state, action) => {
        const { category } = action.meta.arg;
        state.statusByCategory[category] = "failed";
        state.errorByCategory[category] =
          action.payload?.message || action.error.message;
      });

  },
});

export default ProductsSlice.reducer;
