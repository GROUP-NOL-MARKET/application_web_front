import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";
import ReviewsReducer from "./ReviewsSlice";
import messagesReducer from "./MessagesSlice";
import CommandesReducer from "./CommandesSlice";
import FavorisReducer from "./FavorisSlice";
import vouchersReducer from "./VouchersSlice";
import recentViewsReducer from "./RecentViewsSlice";
import clientsReducer from "./ClientsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        reviews: ReviewsReducer,
        messages: messagesReducer,
        commandes: CommandesReducer,
        favoris: FavorisReducer,
        vouchers: vouchersReducer,
        recentViews: recentViewsReducer,
        clients: clientsReducer,
    },
});
