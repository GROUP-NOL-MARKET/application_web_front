// src/store/favorisSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api";

// Fetch avec pagination
export const fetchFavoris = createAsyncThunk(
    "favoris/fetch",
    async ({ page = 1, perPage = 8 }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_URL}/favorites?page=${page}&per_page=${perPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addFavori = createAsyncThunk("favoris/add", async (productId) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
        `${API_URL}/favorites`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Produit ajouté aux favoris !");
    return res.data.favorite;
});

export const removeFavori = createAsyncThunk("favoris/remove", async (favoriId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/favorites/${favoriId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    toast.info("Favori supprimé");
    return favoriId;
});

const FavorisSlice = createSlice({
    name: "favoris",
    initialState: {
        items: [],
        pagination: { current_page: 1, last_page: 1, total: 0 },
        loading: false,
        cacheTimestamp: null, // pour éviter rechargement constant
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoris.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavoris.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = {
                    current_page: action.payload.current_page,
                    last_page: action.payload.last_page,
                    total: action.payload.total,
                };
                state.cacheTimestamp = Date.now();
            })
            .addCase(fetchFavoris.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addFavori.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(removeFavori.fulfilled, (state, action) => {
                state.items = state.items.filter((f) => f.id !== action.payload);
            });
    },
});

export default FavorisSlice.reducer;
