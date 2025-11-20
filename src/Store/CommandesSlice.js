import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Components/Authentification/api";

export const fetchCommandes = createAsyncThunk(
    "commandes/fetchCommandes",
    async (page, { getState }) => {
        const { commandes } = getState();
        // Si la page est déjà en cache, on ne refait pas d’appel API
        if (commandes.cache[page]) {
            return { cached: true, data: commandes.cache[page], last_page: commandes.totalPages, page };
        }

        const response = await API.get(`/orders?limit=3&page=${page}`);
        const data = response.data;

        return { cached: false, data: data.data, last_page: data.last_page, page };
    }
);

const CommandesSlice = createSlice({
    name: "commandes",
    initialState: {
        orders: [],
        totalPages: 1,
        currentPage: 1,
        loading: false,
        cache: {}, // cache des pages déjà récupérées
    },
    reducers: {
        resetCommandes: (state) => {
            state.orders = [];
            state.cache = {};
            state.totalPages = 1;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommandes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCommandes.fulfilled, (state, action) => {
                const { data, last_page, page, cached } = action.payload;
                state.loading = false;
                state.totalPages = last_page;
                state.currentPage = page;

                if (!cached) {
                    state.cache[page] = data;
                }

                state.orders = state.cache[page];
            })
            .addCase(fetchCommandes.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetCommandes } = CommandesSlice.actions;
export default CommandesSlice.reducer;
