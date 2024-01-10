import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getContacts, getFilterValue } from '../../redux/selectors';
import { fetchContacts } from '../../redux/operations';
import ContactItem from '../ContactItem';

import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>Error...</p>}
      <ul className={css.wrapper}>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.phone}
          />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
