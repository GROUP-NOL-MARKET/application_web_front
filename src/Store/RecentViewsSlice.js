// src/Store/RecentViewsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecentViews = createAsyncThunk(
    "recentViews/fetchRecentViews",
    async ({ token, page = 1, perPage = 8 }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/recent-views?page=${page}&per_page=${perPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
            const data = await response.json();
            return { page, ...data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const RecentViewsSlice = createSlice({
    name: "recentViews",
    initialState: {
        dataByPage: {}, // cache par page
        loading: false,
        error: null,
        lastFetched: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.pagination.current_page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentViews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecentViews.fulfilled, (state, action) => {
                const { page, data, current_page, last_page, total } = action.payload;
                state.dataByPage[page] = data || [];
                state.pagination = { current_page, last_page, total };
                state.loading = false;
                state.lastFetched = Date.now();
            })
            .addCase(fetchRecentViews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCurrentPage } = RecentViewsSlice.actions;
export default RecentViewsSlice.reducer;
