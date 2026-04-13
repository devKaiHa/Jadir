import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { CompanyApi } from "./Api/Companies/CompaniesApi";
import { BlogApi } from "./Api/Blog/BlogApi";
import { CategoryApi } from "./Api/Category/CategoryApi";
import { ContactApi } from "./Api/Contact/ContactApi";

const store = configureStore({
  reducer: {
    [CompanyApi.reducerPath]: CompanyApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [ContactApi.reducerPath]: ContactApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(CompanyApi.middleware)
      .concat(CategoryApi.middleware)
      .concat(BlogApi.middleware)
      .concat(ContactApi.middleware),
});

setupListeners(store.dispatch);

export default store;
