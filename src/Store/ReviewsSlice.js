import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (page, { getState }) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:8000/api/reviews?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        return { data: data.data, last_page: data.last_page, page };
    }
);

const ReviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        totalPages: 1,
        page: 1,
        loading: false,
        cache: {}, // pour stocker les pages déjà chargées
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                const { data, last_page, page } = action.payload;
                state.loading = false;
                state.totalPages = last_page;
                state.page = page;
                state.cache[page] = data;
                state.reviews = data;
            })
            .addCase(fetchReviews.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default ReviewsSlice.reducer;
