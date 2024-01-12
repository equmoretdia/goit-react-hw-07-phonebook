import { createSelector } from '@reduxjs/toolkit';

export const selectItems = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
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
