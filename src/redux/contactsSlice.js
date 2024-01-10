import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid/non-secure';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  //old reducers:
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
    //new reducers:
    fetchingInProgress(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// console.log(contactsSlice);

export const {
  addNewContact,
  deleteContact,
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
