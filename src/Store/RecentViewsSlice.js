// Store/recentViewsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecentViews = createAsyncThunk(
    "recentViews/fetchRecentViews",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:8000/api/recent-views", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

            const data = await response.json();
            return data.data || [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const recentViewsSlice = createSlice({
    name: "recentViews",
    initialState: {
        data: [],
        loading: false,
        error: null,
        lastFetched: null, // pour gestion du cache
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentViews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecentViews.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.lastFetched = Date.now();
            })
            .addCase(fetchRecentViews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default recentViewsSlice.reducer;
