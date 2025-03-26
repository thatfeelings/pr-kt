import React, { useState } from 'react';
import { MagnifyingGlass } from "@phosphor-icons/react";

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
    <div className="flex flex-col  max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو ..."
          value={query}
          onChange={handleInputChange}
          dir="rtl"
          className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400
          text-right bg-primary-100 border border-black placeholder-black text-black"
        />
        <MagnifyingGlass size={32}
          onClick={handleSearch}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white-500 text-white rounded-full 
          overflow-visible bg-primary-80 size-8 p-1"
        />
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
