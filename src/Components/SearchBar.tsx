import { useState } from 'react';
import _ from 'lodash'

type Props = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  //debounce header
  const debouncedSearch = _.debounce((value: String) => {
    onSearch(value.trim());

  }, 300);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedSearch(input);
    }
  }

  return (


    <div className="w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Search by name or noradCatId"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchBar;

