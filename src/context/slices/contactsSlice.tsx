import { createSlice } from "@reduxjs/toolkit";

export interface IContact {
  contacts: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    favorite: boolean;
  }[];
}

const initialState: IContact = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // contacts reducers
    createInitialState: (state, action) => {
      // generate random quantity of possible favorite contacts
      const maxFavorites = 4;
      const ids = new Set<number>();

      // take the id's of the contacts to be marked as favorite
      while (ids.size < maxFavorites) {
        const index = Math.floor(Math.random() * action.payload.length);
        const { id } = action.payload[index];
        ids.add(id);
      }

      // generate the initialState with the favorite random favorite field
      const newInitialState: IContact["contacts"] = action.payload.map(
        (c: IContact["contacts"][0]) => {
          return { ...c, favorite: ids.has(c.id) };
        }
      );

      // create the initialState
      state.contacts = [...newInitialState].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
    },
    createContact: (state, action) => {
      state.contacts = [
        { favorite: false, ...action.payload },
        ...state.contacts,
      ].sort((a, b) => a.first_name.localeCompare(b.first_name));
    },
    updateContact: (state, action) => {
      const newState = state.contacts.map((contact) =>
        contact.id === action.payload.id
          ? { ...contact, ...action.payload }
          : contact
      );

      state.contacts = newState;
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
    toggleFavorite: (state, action) => {
      const newState = state.contacts.map((c) =>
        c.id === action.payload.id
          ? {
              ...c,
              favorite: !c.favorite,
            }
          : c
      );

      state.contacts = newState;
    },
  },
});

export const {
  createContact,
  updateContact,
  deleteContact,
  createInitialState,
  toggleFavorite,
} = contactsSlice.actions;
export default contactsSlice.reducer;
