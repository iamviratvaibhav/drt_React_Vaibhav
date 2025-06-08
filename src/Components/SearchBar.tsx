import { useState } from 'react';
import _ from 'lodash';

type Props = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  const debouncedSearch = _.debounce((value: string) => {
    onSearch(value.trim());
  }, 300);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedSearch(input);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <input
        type="text"
        className="w-full px-5 py-3 text-lg rounded-full shadow-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        placeholder="Search by name or noradCatId"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
