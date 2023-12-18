import React, { useState, useEffect } from 'react';
import { Box, TitlePrimary, TitleSecondary, TitleThird } from './App.styled';
import ContactFormComponent from 'components/ContactForm/ContactForm';
import FilterComponent from 'components/Filter/Filter';
import ContactListComponent from 'components/ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts && JSON.parse(localContacts).length > 0) {
      setContacts(JSON.parse(localContacts));
    }
  }, []);

  useEffect(() => {
    const contactData = contacts.map(({ name, number }) => ({
      name,
      number,
    }));
    localStorage.setItem('contacts', JSON.stringify(contactData));
  }, [contacts]);

  const onChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const onDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onContactAdd = newContact => {
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Box>
        <TitlePrimary>Phonebook</TitlePrimary>
        <ContactFormComponent contacts={contacts} onContactAdd={onContactAdd} />
        <TitleSecondary>Contacts</TitleSecondary>
        <TitleThird>Find contact name by number:</TitleThird>
        <FilterComponent onChange={onChangeFilter} value={filter} />
        {contacts.length > 0 && (
          <ContactListComponent
            filteredContacts={filteredContacts}
            onDeleteContact={onDeleteContact}
          />
        )}
      </Box>
    </>
  );
};

export default App;
