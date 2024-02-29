import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: { contacts: contactsReducer, ui: uiReducer },
});

export type Store = ReturnType<typeof store.getState>;
