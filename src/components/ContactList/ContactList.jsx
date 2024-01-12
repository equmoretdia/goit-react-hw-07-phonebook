import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  // selectItems,
  selectIsLoading,
  selectError,
  // selectFilterValue,
  selectFilteredContacts,
} from '../../redux/selectors';
import { fetchContacts } from '../../redux/operations';
import ContactItem from '../ContactItem';
import Loader from '../Loader';

import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  // const items = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  // const filter = useSelector(selectFilterValue);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const getFilteredContacts = () => {
  //   return items.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  // };

  // const filteredContacts = getFilteredContacts();

  return (
    <>
      {isLoading && !error && <Loader />}
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
