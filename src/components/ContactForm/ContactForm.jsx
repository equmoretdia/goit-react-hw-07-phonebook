import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { addContact } from '../../redux/operations';
import { selectItems, selectAddContactIsLoading } from '../../redux/selectors';
import LoaderInButton from '../LoaderInButton';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const isLoading = useSelector(selectAddContactIsLoading);
  const [state, setState] = useState({ name: '', phone: '' });
  const { name, phone } = state;

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(`name:${name}, number:${number}`);
    // console.log(contacts);
    if (
      items.some(
        contact => contact.name.toLowerCase() === name.toLowerCase().trim()
      )
    ) {
      toast.warn(`${name} is already in your contacts`, {
        position: 'top-right',
        theme: 'colored',
      });
    } else if (items.some(contact => contact.phone === phone.trim())) {
      toast.warn(`${phone} is already in your contacts`, {
        position: 'top-right',
        theme: 'colored',
      });
    } else {
      handleContactAddition();
    }
  };

  const formReset = () => {
    setState({ name: '', phone: '' });
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleContactAddition = async () => {
    try {
      await dispatch(addContact(state));
      toast.success(`New contact "${name}" has been added successfully`, {
        position: 'top-right',
        theme: 'colored',
      });
      formReset();
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor="">
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label} htmlFor="">
        Number
        <input
          className={css.input}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button className={css.button} type="submit">
        {isLoading ? <LoaderInButton /> : 'Add contact'}
      </button>
    </form>
  );
};

export default ContactForm;
