import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone : fetch depuis ton API
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (sousCategory) => {
        const url = new URL("http://127.0.0.1:8000/api/products");
        url.searchParams.append("sous_category", sousCategory);
        const response = await fetch(url);
        const result = await response.json();
        return { sousCategory, data: result.data };
    }
);

const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        items: {}, // ex : { "Matériels Nasco": [...] }
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
