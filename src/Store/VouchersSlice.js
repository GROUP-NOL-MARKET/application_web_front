import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Components/Authentification/api";

export const fetchVouchers = createAsyncThunk(
  "vouchers/fetchVouchers",
  async ({ page = 1, per_page = 5, status = "actif" }, { rejectWithValue }) => {
    try {
      const response = await API.get("/vouchers", {
        params: {
          page,
          per_page,
          status,
        },
      });

      return {
        page,
        status,
        ...response.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
