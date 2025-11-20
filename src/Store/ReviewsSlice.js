import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Components/Authentification/api";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await API.get("/reviews", {
        params: { page },
      });

      return {
        page,
        data: response.data.data,
        last_page: response.data.last_page,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const ReviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        totalPages: 1,
        pagination: { current_page: 1, last_page: 1, total: 0 },
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
                state.pagination = {
                    current_page: action.payload.current_page,
                    last_page: action.payload.last_page,
                    total: action.payload.total,
                };
                state.cache[page] = data;
                state.reviews = data;
            })
            .addCase(fetchReviews.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default ReviewsSlice.reducer;
