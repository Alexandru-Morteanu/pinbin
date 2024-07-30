import React, { useEffect } from "react";

type Props = {
  searchTerm: string;
  handleSearch?: boolean;
  setSearchTerm: Function;
  setHandleSearch: Function;
  suggestions: any[];
};

export default function Search({
  searchTerm,
  setSearchTerm,
  setHandleSearch,
  handleSearch,
  suggestions,
}: Props) {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setHandleSearch(!handleSearch);
    }
  };

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 p-4 z-[90] max-w-md">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
          className="w-full py-2 pl-10 pr-4 border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id || suggestion.display_name}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSearchTerm(suggestion.display_name);
                setHandleSearch(!handleSearch);
              }}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
