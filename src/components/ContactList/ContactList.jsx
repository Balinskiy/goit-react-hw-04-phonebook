import React from 'react';
import {
  ContactItem,
  ContactList,
  DeleteButton,
} from 'components/ContactList/ContactList.styled';

const ContactListComponent = ({ filteredContacts, onDeleteContact }) => (
  <ContactList>
    {filteredContacts.map(contact => (
      <ContactItem key={contact.id}>
        {contact.name}:{contact.number}
        <DeleteButton onClick={() => onDeleteContact(contact.id)}>
          Delete
        </DeleteButton>
      </ContactItem>
    ))}
  </ContactList>
);

export default ContactListComponent;
