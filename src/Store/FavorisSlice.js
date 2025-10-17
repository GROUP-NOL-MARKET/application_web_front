// src/store/favorisSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api";

// Récupération des favoris
export const fetchFavoris = createAsyncThunk("favoris/fetch", async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data || res.data; // compatibilité format Laravel
});

// Ajout aux favoris
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

//  Suppression d’un favori
export const removeFavori = createAsyncThunk("favoris/remove", async (favoriId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/favorites/${favoriId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    toast.info("Favori supprimé");
    return favoriId;
});

const favorisSlice = createSlice({
    name: "favoris",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        resetFavoris: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoris.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavoris.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFavoris.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addFavori.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFavori.fulfilled, (state, action) => {
                state.items = state.items.filter((f) => f.id !== action.payload);
            });
    },
});

export const { resetFavoris } = favorisSlice.actions;
export default favorisSlice.reducer;
