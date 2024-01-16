import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteContact } from '../../redux/operations';
import { selectDeletedContactId } from '../../redux/selectors';
import LoaderInButton from '../LoaderInButton';

import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const deletedContactId = useSelector(selectDeletedContactId);

  const handleContactDeletion = async () => {
    try {
      await dispatch(deleteContact(id));
      toast.success(`Contact "${name}" has been deleted successfully`, {
        position: 'top-right',
        theme: 'colored',
      });
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button
        className={css.button}
        type="button"
        onClick={handleContactDeletion}
      >
        {deletedContactId === id ? <LoaderInButton /> : 'Delete'}
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
