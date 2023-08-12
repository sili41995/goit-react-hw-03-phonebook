import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Section from 'components/Section';
import loadContacts from 'utils/loadContacts';
import LS_KEY from 'constants/local-storage-key';
import saveContacts from 'utils/saveContacts';

class App extends Component {
  state = { contacts: [], filter: '' };

  componentDidMount() {
    const contacts = loadContacts(LS_KEY);
    if (!contacts?.length) return;
    this.setState({ contacts });
  }

  componentDidUpdate(_, { contacts }) {
    const isSaveContacts = contacts.length !== this.state.contacts;
    if (isSaveContacts) {
      saveContacts(LS_KEY, this.state.contacts);
    }
  }

  handleFormSubmit = (values, { resetForm }) => {
    const isContact = this.state.contacts.some(
      ({ name }) => name === values.name
    );
    if (isContact) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
    const contact = { id: nanoid(), ...values };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
    resetForm();
  };

  handleDelBtnClick = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  handleFilterChange = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <Section>
        <h1>Phonebook</h1>
        <ContactForm handleFormSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={contacts}
          filter={filter}
          handleDelBtnClick={this.handleDelBtnClick}
        />
      </Section>
    );
  }
}

export default App;
