// Store/vouchersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVouchers = createAsyncThunk(
    "vouchers/fetchVouchers",
    async ({ token, page = 1 }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/vouchers?page=${page}&per_page=5`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Erreur lors du chargement des bons");
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const vouchersSlice = createSlice({
    name: "vouchers",
    initialState: {
        data: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVouchers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVouchers.fulfilled, (state, action) => {
                const { data, current_page, last_page } = action.payload;
                state.data = data || [];
                state.currentPage = current_page;
                state.totalPages = last_page;
                state.loading = false;
            })
            .addCase(fetchVouchers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default vouchersSlice.reducer;
