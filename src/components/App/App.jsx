import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import css from 'components/App/App.styled';

const { Container, Title, Subtitle } = css;

class App extends Component {
  static defaultProps = {
    initialValue: '',
  };

  static propTypes = { initialValue: PropTypes.string.isRequired };

  state = {
    contacts: [],
    filter: this.props.initialValue,
  };

  addContact = (contact) => {
    const contacts = this.state.contacts;
    const contactName = contact.name;
    const contactIndex = contacts.findIndex(({ name }) => name === contactName);
    if (!!~contactIndex) {
      alert(`${contactName} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  onChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterContacts = (value) => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = value.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  onDeleteContact = (id) => {
    this.setState(({ contacts }) => {
      const updateContacts = contacts.filter(
        ({ id: contactId }) => contactId !== id
      );
      return { contacts: updateContacts };
    });
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.filterContacts(filter);

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm addContact={this.addContact} />
        <Subtitle>Contacts</Subtitle>
        <Filter value={filter} onChangeInput={this.onChangeInput} />
        {!!contacts.length && (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.onDeleteContact}
          />
        )}
      </Container>
    );
  }
}

export default App;
