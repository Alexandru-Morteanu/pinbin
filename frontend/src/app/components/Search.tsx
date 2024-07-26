import React, { useEffect } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
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
  const handleValueChange = (search: string) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  return (
    <div className="search-container right-[24px] left-[24px] absolute translate-y-[-115px] z-50">
      <Command className="rounded-lg border shadow-md h-auto p-4 dark">
        <CommandInput
          value={searchTerm}
          onValueChange={handleValueChange}
          placeholder="Enter city name"
          className="search-input"
        />
        <button
          onClick={() => {
            setHandleSearch(!handleSearch);
          }}
          className="search-button z-30"
        >
          Search
        </button>
        <CommandList className="max-h-[300px] overflow-y-auto">
          {/* <CommandGroup heading="Suggestions"></CommandGroup> */}
          {suggestions.map((suggestion) => (
            <div key={suggestion.place_id || suggestion.display_name}>
              <div
                onClick={() => {
                  setSearchTerm(suggestion.display_name);
                }}
              >
                {suggestion.display_name}
              </div>
            </div>
          ))}
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
}
