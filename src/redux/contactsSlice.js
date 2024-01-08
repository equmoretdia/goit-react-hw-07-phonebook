import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid/non-secure';

import initialContacts from 'data/contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addNewContact(state, action) {
      const { name, number } = action.payload;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      //   state = [...state.list, newContact];
      state.push(newContact);
    },
    deleteContact(state, action) {
      const { id } = action.payload;
      return state.filter(contact => contact.id !== id);
    },
  },
});

// console.log(contactsSlice);

export const { addNewContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
