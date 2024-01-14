import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteContact } from '../../redux/operations';

import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDeletion = () => {
    dispatch(deleteContact(id));
    toast.success(`Contact "${name}" has been deleted successfully`, {
      position: 'top-right',
      theme: 'colored',
    });
  };

  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button className={css.button} type="button" onClick={handleDeletion}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
