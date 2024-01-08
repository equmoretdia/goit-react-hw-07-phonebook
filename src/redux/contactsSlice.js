import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid/non-secure';

import initialContacts from 'data/contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { list: initialContacts },
  reducers: {
    addNewContact(state, action) {
      const { name, number } = action.payload;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      //   state.list = [...state.list, newContact];
      state.list.push(newContact);
    },
    deleteContact(state, action) {
      const { id } = action.payload;
      state.list = state.list.filter(contact => contact.id !== id);
    },
  },
});

// console.log(contactsSlice);
//start
const persistConfig = {
  key: 'contacts',
  storage,
};

export const { addNewContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
