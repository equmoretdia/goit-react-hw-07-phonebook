import { createSelector } from '@reduxjs/toolkit';

export const selectItems = state => state.contacts.items;
export const selectFetchContactsIsLoading = state =>
  state.contacts.isLoading.fetchContacts;
export const selectAddContactIsLoading = state =>
  state.contacts.isLoading.addContact;
export const selectDeletedContactId = state =>
  state.contacts.isLoading.deletedContactId;
export const selectError = state => state.contacts.error;

export const selectFilterValue = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectItems, selectFilterValue],
  (items, filter) => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
