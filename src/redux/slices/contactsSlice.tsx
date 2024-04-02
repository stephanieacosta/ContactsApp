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
    createInitialState: (state, action) => {
      // generar cantidad aleatoria de contactos favoritos posibles
      const maxFavorites = 4;
      const ids = new Set<number>();

      // tomar los id's de los contactos para marcarlos como favorito
      while (ids.size < maxFavorites) {
        const index = Math.floor(Math.random() * action.payload.length);
        const { id } = action.payload[index];
        ids.add(id);
      }

      // generar el estadoInicial con el campo de favorito aleatoriamente
      const newInitialState: IContact["contacts"] = action.payload.map(
        (c: IContact["contacts"][0]) => {
          return { ...c, favorite: ids.has(c.id) };
        }
      );

      // crear el estadoInicial
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
  deleteContact,
  createInitialState,
  toggleFavorite,
} = contactsSlice.actions;
export default contactsSlice.reducer;
