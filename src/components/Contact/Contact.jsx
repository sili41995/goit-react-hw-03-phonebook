import { Item } from './Contact.styled';

const Contact = ({ name, number, handleDelBtnClick }) => (
  <Item>
    <span>
      {name}: {number}
    </span>
    <button type='button' onClick={handleDelBtnClick}>
      Delete
    </button>
  </Item>
);

export default Contact;
