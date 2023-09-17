import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

const getIntialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
};

export const AppNew = () => {
  const [contacts, setContacts] = useState(getIntialContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isUnique = !contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isUnique) {
      setContacts(prevItems => [...prevItems, { id: nanoid(), ...newContact }]);
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const findContact = event => {
    setFilter(event.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevItems =>
      prevItems.filter(contact => contact.id !== contactId)
    );
  };


  const filterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const usersInfo = filterContact();

  return (
    <div style={{ padding: '5px 20px' }}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <h2>Contacts</h2>
      <Filter find={findContact} />
      <ContactList users={usersInfo} onDelete={deleteContact} />
    </div>
  );
};
