import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Thunk pour charger les stats clients
export const fetchClientsStats = createAsyncThunk(
    "clients/fetchClientsStats",
    async (token, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:8000/api/admin/clients-stats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
            const data = await res.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        stats: null,
        loading: false,
        error: null,
        lastFetched: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientsStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClientsStats.fulfilled, (state, action) => {
                state.stats = action.payload;
                state.loading = false;
                state.lastFetched = Date.now();
            })
            .addCase(fetchClientsStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default clientsSlice.reducer;
