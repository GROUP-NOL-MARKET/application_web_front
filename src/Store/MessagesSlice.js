import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, deleteMessage } from "../Components/Authentification/api";

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async ({ token, page, sort }, { getState }) => {
        const { messages } = getState();

        // Si la page existe déjà dans le cache, on la renvoie directement
        if (messages.cache[page] && messages.cache[page].sort === sort) {
            return { cached: true, ...messages.cache[page] };
        }

        const data = await getMessages(token, page, sort);
        return { cached: false, data, page, sort };
    }
);

export const removeMessage = createAsyncThunk(
    "messages/removeMessage",
    async ({ id, token }) => {
        await deleteMessage(id, token);
        return id;
    }
);

const MessagesSlice = createSlice({
    name: "messages",
    initialState: {
        data: [],
        cache: {}, // cache[page] = { sort, data }
        currentPage: 1,
        lastPage: 1,
        sort: "recent",
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { data, page, cached, sort } = action.payload;
                state.loading = false;
                state.sort = sort;

                if (!cached) {
                    state.cache[page] = { sort, data: data.data, last_page: data.last_page };
                }

                state.data = state.cache[page].data;
                state.lastPage = data.last_page;
                state.currentPage = page;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeMessage.fulfilled, (state, action) => {
                const id = action.payload;
                state.data = state.data.filter((msg) => msg.id !== id);

                // Supprimer aussi du cache
                Object.keys(state.cache).forEach((page) => {
                    state.cache[page].data = state.cache[page].data.filter((msg) => msg.id !== id);
                });
            });
    },
});

export default MessagesSlice.reducer;
