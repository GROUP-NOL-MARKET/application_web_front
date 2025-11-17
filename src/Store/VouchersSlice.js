import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVouchers = createAsyncThunk(
    "vouchers/fetchVouchers",
    async ({ token, page = 1, per_page = 5, status = "actif" }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/vouchers?page=${page}&per_page=${per_page}&status=${status}`, {
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
        dataByPage: {}, // cache des pages déjà chargées
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
        lastFetched: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVouchers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVouchers.fulfilled, (state, action) => {
                const { data, current_page, last_page } = action.payload;
                const status = action.meta.arg.status; // récupère le status envoyé
                const key = `${current_page}_${status}`;
                state.dataByPage[key] = data || [];
                state.currentPage = current_page;
                state.totalPages = last_page;
                state.loading = false;
                state.lastFetched = Date.now();
            })

            .addCase(fetchVouchers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = vouchersSlice.actions;
export default vouchersSlice.reducer;
