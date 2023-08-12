import { nanoid } from 'nanoid';
import { Label, Input } from './Filter.styled';

const filterId = nanoid();

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <>
      <Label htmlFor={filterId}>Find contacts by name</Label>
      <Input
        id={filterId}
        type='text'
        value={filter}
        onChange={handleFilterChange}
      />
    </>
  );
};

export default Filter;
