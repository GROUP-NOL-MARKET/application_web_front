import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";
import reviewsReducer from "./ReviewsSlice";
import messagesReducer from "./MessagesSlice";
import commandesReducer from "./CommandesSlice";
import favorisReducer from "./FavorisSlice";
import vouchersReducer from "./VouchersSlice";
import recentViewsReducer from "./RecentViewsSlice";
import clientsReducer from "./ClientsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        reviews: reviewsReducer,
        messages: messagesReducer,
        commandes: commandesReducer,
        favoris: favorisReducer,
        vouchers: vouchersReducer,
        recentViews: recentViewsReducer,
        clients: clientsReducer,
    },
});
