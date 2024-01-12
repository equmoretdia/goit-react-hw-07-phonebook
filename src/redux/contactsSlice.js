import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid/non-secure';

import { fetchContacts, addContact, deleteContact } from './operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  // //old reducers:
  // reducers: {
  //   addNewContact(state, action) {
  //     const { name, number } = action.payload;
  //     const newContact = {
  //       id: nanoid(),
  //       name,
  //       number,
  //     };
  //     //   state = [...state.list, newContact];
  //     state.push(newContact);
  //   },
  //   deleteContact(state, action) {
  //     const { id } = action.payload;
  //     return state.filter(contact => contact.id !== id);
  //   },
  //   //new reducers:
  //   fetchingInProgress(state) {
  //     state.isLoading = true;
  //   },
  //   fetchingSuccess(state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items = action.payload;
  //   },
  //   fetchingError(state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// console.log(contactsSlice);

// export const {
//   addNewContact,
//   deleteContact,
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
