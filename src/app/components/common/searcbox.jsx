import React, { useState } from 'react';

const SearchBox = ({ type, onSearch, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState(['Tag1', 'Tag2']);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (type === 'dropdown') {
      setFilteredSuggestions(suggestions.filter((s) => s.toLowerCase().includes(e.target.value.toLowerCase())));
    }
  };

  const handleSearch = () => {
    if (type === 'tags') {
      onSearch(query, tags);
    } else {
      onSearch(query);
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Render Tags for 'tags' type */}
      {type === 'tags' && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-red-500 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render Dropdown Suggestions for 'dropdown' type */}
      {type === 'dropdown' && filteredSuggestions.length > 0 && (
        <div className="border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-auto">
          {filteredSuggestions.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setQuery(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
