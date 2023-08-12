import Contact from 'components/Contact/Contact';
import filteredContacts from 'utils/filteredContacts';
import { List } from './ContactList.styled';

const ContactList = ({ contacts, filter, handleDelBtnClick }) => {
  const visibleContacts = filteredContacts(filter, contacts);
  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          name={name}
          number={number}
          handleDelBtnClick={() => handleDelBtnClick(id)}
        />
      ))}
    </List>
  );
};

export default ContactList;
