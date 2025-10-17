import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, deleteMessage } from "../Components/Authentification/api";

// Thunk pour récupérer les messages
export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async ({ token, page, sort }, { rejectWithValue }) => {
        try {
            const data = await getMessages(token, page, sort);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Thunk pour supprimer un message
export const removeMessage = createAsyncThunk(
    "messages/removeMessage",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await deleteMessage(id, token);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const MessagesSlice = createSlice({
    name: "messages",
    initialState: {
        data: [],
        currentPage: 1,
        lastPage: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Récupération
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.data = data;
                state.currentPage = data.current_page;
                state.lastPage = data.last_page;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Suppression
            .addCase(removeMessage.fulfilled, (state, action) => {
                state.data = state.data.filter((msg) => msg.id !== action.payload);
            });
    },
});

export default MessagesSlice.reducer;
