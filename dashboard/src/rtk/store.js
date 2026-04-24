import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// APIs
import { aboutHomeApi } from "./aboutHomeApi";
import { footerApi } from "./footerApi";
import { homeSliderApi } from "./homeSliderApi";
import { partnersApi } from "./partnersApi";
import { sectorsApi } from "./sectorsApi";
import { valuesApi } from "./valuesApi";
import { aboutServicesApi } from "./aboutServicesApi";
import { ourServicesApi } from "./ourServicesApi";
import { plansApi } from "./plansApi";
import { categoriesApi } from "./categoriesApi";
import { blogsApi } from "./blogsApi";
import { boardMembersApi } from "./boardMembersApi";
import { investmentFundsApi } from "./investmentFundsApi";
import { messagesApi } from "./messagesApi";
import { usersApi } from "./usersApi";
import { companiesApi } from "./companiesApi";
import { authApi } from "./authApi";
import { customPagesApi } from "./customPagesApi";
import { statisticsApi } from "./statisticsApi";
import { researchApi } from "./researchApi";
import { projectsApi } from "./projectsApi";
import { contactUsApi } from "./contactUsApi";
import { testimonialsApi } from "./testimonialsApi";
import { policiesApi } from "./policiesApi";
import { careersApi } from "./careersApi";
import { pageBannersApi } from "./pageBannersApi";

const store = configureStore({
  reducer: {
    [aboutHomeApi.reducerPath]: aboutHomeApi.reducer,
    [footerApi.reducerPath]: footerApi.reducer,
    [homeSliderApi.reducerPath]: homeSliderApi.reducer,
    [partnersApi.reducerPath]: partnersApi.reducer,
    [sectorsApi.reducerPath]: sectorsApi.reducer,
    [valuesApi.reducerPath]: valuesApi.reducer,
    [aboutServicesApi.reducerPath]: aboutServicesApi.reducer,
    [ourServicesApi.reducerPath]: ourServicesApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [boardMembersApi.reducerPath]: boardMembersApi.reducer,
    [investmentFundsApi.reducerPath]: investmentFundsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [customPagesApi.reducerPath]: customPagesApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [researchApi.reducerPath]: researchApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [contactUsApi.reducerPath]: contactUsApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [policiesApi.reducerPath]: policiesApi.reducer,
    [careersApi.reducerPath]: careersApi.reducer,
    [pageBannersApi.reducerPath]: pageBannersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(aboutHomeApi.middleware)
      .concat(footerApi.middleware)
      .concat(homeSliderApi.middleware)
      .concat(partnersApi.middleware)
      .concat(sectorsApi.middleware)
      .concat(valuesApi.middleware)
      .concat(aboutServicesApi.middleware)
      .concat(ourServicesApi.middleware)
      .concat(plansApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(blogsApi.middleware)
      .concat(boardMembersApi.middleware)
      .concat(investmentFundsApi.middleware)
      .concat(messagesApi.middleware)
      .concat(usersApi.middleware)
      .concat(companiesApi.middleware)
      .concat(authApi.middleware)
      .concat(customPagesApi.middleware)
      .concat(statisticsApi.middleware)
      .concat(researchApi.middleware)
      .concat(projectsApi.middleware)
      .concat(contactUsApi.middleware)
      .concat(testimonialsApi.middleware)
      .concat(policiesApi.middleware)
      .concat(careersApi.middleware)
      .concat(pageBannersApi.middleware),
});

setupListeners(store.dispatch);

export default store;
