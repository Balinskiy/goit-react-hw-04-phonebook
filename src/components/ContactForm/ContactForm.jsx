import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Button, ContactForm, Input, Label } from './ContactForm.styled';

const ContactFormComponent = ({ contacts, onContactAdd }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChangeInput = evt => {
    const { value, name } = evt.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const onSubmit = evt => {
    evt.preventDefault();

    const isDuplicate = contacts.some(
      contact => contact.name === name && contact.number === number
    );

    if (isDuplicate) {
      alert('This name is already in the phonebook');
      return;
    }

    const newContact = { name, number, id: nanoid() };
    onContactAdd(newContact);
    setName('');
    setNumber('');
  };

  return (
    <ContactForm onSubmit={onSubmit}>
      <Label>Name</Label>
      <Input
        value={name}
        onChange={onChangeInput}
        type="text"
        name="name"
        required
        placeholder="Add contact name"
      />
      <Label>Number</Label>
      <Input
        value={number}
        onChange={onChangeInput}
        type="tel"
        name="number"
        required
        placeholder="Add contact number"
      />
      <Button type="submit">Add Contact</Button>
    </ContactForm>
  );
};

export default ContactFormComponent;
