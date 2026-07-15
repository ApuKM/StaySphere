import React, { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import {
  Select,
  TextField,
  InputGroup,
  ListBox,
  Label,
} from "@heroui/react";
import { SpaceFilters } from "@/utils/types/Filter";


interface SpaceFilterBarProps {
  filters: SpaceFilters;
  onFilterChange: (newFilters: Partial<SpaceFilters>) => void;
}

export default function SpaceFilterBar({
  filters,
  onFilterChange,
}: SpaceFilterBarProps) {
  const [searchValue, setSearchValue] = useState(filters.searchQuery);
  const isSearchDraft = searchValue !== filters.searchQuery;

  const commitSearch = () => {
    if (isSearchDraft) {
      onFilterChange({ searchQuery: searchValue });
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitSearch();
    }
  };

  // ফিল্টার অপশনসমূহ
  const locations = [
    "All",
    "Indonesia",
    "Thailand",
    "Japan",
    "United States",
    "United Kingdom",
    "Maldives"
  ];

  const propertyTypes = [
    "All",
    "Entire Apartment",
    "Entire House",
    "Cabin",
    "Villa",
    "Private Room",
  ];

  const sortOptions = [
    { id: "default", label: "Default Sorting" },
    { id: "low-to-high", label: "Price: Low to High" },
    { id: "high-to-low", label: "Price: High to Low" },
  ];

  return (
    <div className="w-full bg-brand-bg p-4 rounded-2xl shadow-sm border border-brand-border flex flex-col xl:flex-row gap-4 items-center justify-between mb-8">
      
      {/* 🔍 Search Input */}
      <div className="w-full xl:w-1/3">
        <TextField className="w-full">
          <Label className="sr-only">Search spaces</Label>
          <InputGroup className="bg-brand-bg-soft border border-brand-border hover:border-brand-primary/50 focus-within:border-brand-primary rounded-xl text-brand-text transition-colors w-full flex items-center px-1">
            <InputGroup.Prefix className="pl-3 pr-2 text-slate-400">
              <FiSearch size={18} />
            </InputGroup.Prefix>
            <InputGroup.Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={commitSearch}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search destinations, titles..."
              className="bg-transparent border-none text-sm placeholder:text-slate-500 focus:outline-none py-3 w-full"
            />
          </InputGroup>
          <p className="mt-2 text-xs text-slate-500">
            {isSearchDraft ? (
              <span className="text-brand-primary">Press Enter or leave the field to apply search</span>
            ) : (
              "Search is up to date"
            )}
          </p>
        </TextField>
      </div>

      {/* 🎛️ Filters Container */}
      <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto flex-1 xl:justify-end">
        
        {/* 📍 Location Select */}
        <div className="w-full sm:w-44">
          <Select
            value={filters.location}
            onChange={(val) => {
              if (val) onFilterChange({ location: String(val) });
            }}
            placeholder="Location"
          >
            <Label className="sr-only">Location</Label>
            <Select.Trigger className="bg-brand-bg-soft border border-brand-border hover:border-brand-primary/50 focus:border-brand-primary rounded-xl text-sm text-brand-text w-full flex justify-between items-center px-4 py-3 transition-colors outline-none cursor-pointer">
              <Select.Value />
              <Select.Indicator className="text-slate-400">
                <FiChevronDown size={16} />
              </Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-brand-bg border border-brand-border rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                {locations.map((loc) => (
                  <ListBox.Item
                    key={loc}
                    id={loc}
                    textValue={loc}
                    className="px-3 py-2.5 hover:bg-brand-bg-soft focus:bg-brand-primary/10 focus:text-brand-primary rounded-lg cursor-pointer text-sm text-brand-text outline-none transition-colors"
                  >
                    <Label className="cursor-pointer block w-full">{loc}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* 🏠 Property Type Select */}
        <div className="w-full sm:w-44">
          <Select
            value={filters.propertyType}
            onChange={(val) => {
              if (val) onFilterChange({ propertyType: String(val) });
            }}
            placeholder="Property Type"
          >
            <Label className="sr-only">Property Type</Label>
            <Select.Trigger className="bg-brand-bg-soft border border-brand-border hover:border-brand-primary/50 focus:border-brand-primary rounded-xl text-sm text-brand-text w-full flex justify-between items-center px-4 py-3 transition-colors outline-none cursor-pointer">
              <Select.Value />
              <Select.Indicator className="text-slate-400">
                <FiChevronDown size={16} />
              </Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-brand-bg border border-brand-border rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                {propertyTypes.map((type) => (
                  <ListBox.Item
                    key={type}
                    id={type}
                    textValue={type}
                    className="px-3 py-2.5 hover:bg-brand-bg-soft focus:bg-brand-primary/10 focus:text-brand-primary rounded-lg cursor-pointer text-sm text-brand-text outline-none transition-colors"
                  >
                    <Label className="cursor-pointer block w-full">{type}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* 💲 Price Sort Select */}
        <div className="w-full sm:w-48">
          <Select
            value={filters.priceSort}
            onChange={(val) => {
              if (val) onFilterChange({ priceSort: String(val) });
            }}
            placeholder="Sort by Price"
          >
            <Label className="sr-only">Sort by Price</Label>
            <Select.Trigger className="bg-brand-bg-soft border border-brand-border hover:border-brand-primary/50 focus:border-brand-primary rounded-xl text-sm text-brand-text w-full flex justify-between items-center px-4 py-3 transition-colors outline-none cursor-pointer">
              <Select.Value />
              <Select.Indicator className="text-slate-400">
                <FiChevronDown size={16} />
              </Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-brand-bg border border-brand-border rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1.5">
                {sortOptions.map((opt) => (
                  <ListBox.Item
                    key={opt.id}
                    id={opt.id}
                    textValue={opt.label}
                    className="px-3 py-2.5 hover:bg-brand-bg-soft focus:bg-brand-primary/10 focus:text-brand-primary rounded-lg cursor-pointer text-sm text-brand-text outline-none transition-colors"
                  >
                    <Label className="cursor-pointer block w-full">{opt.label}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

      </div>
    </div>
  );
}