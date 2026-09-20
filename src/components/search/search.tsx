"use client";

import paths from "@/app/paths";
import getSearchMediaAPI from "@/apis/common/get-search-media";
import useDebounce from "@/hooks/useDebounce";
import { SearchResultType } from "@/types";
import { Input, InputProps } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchContainer from "./search-container";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, 300);
  const pathname = usePathname();
  const router = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [searchResults, setSearchResults] = useState<
    SearchResultType[] | undefined
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchContainer, setShowSearchContainer] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setSearchResults([]);
    setInputValue("");
  }

  const handleInputChange: InputProps["onChange"] = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown: InputProps["onKeyDown"] = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setShowSearchContainer(false);
      router.push(paths.search(inputValue));
    }
    if (e.key === "Escape") {
      setShowSearchContainer(false);
    }
  };

  useEffect(() => {
    if (!debouncedValue) return;

    let ignore = false;

    const getSearchResults = async () => {
      setIsSearching(true);
      const { response: searchMediaResponse, errors: searchMediaErrors } =
        await getSearchMediaAPI(debouncedValue);

      if (ignore) return;

      if (!searchMediaErrors) {
        setSearchResults(searchMediaResponse?.results);
      }
      setIsSearching(false);
    };
    getSearchResults();

    return () => {
      ignore = true;
    };
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        inputRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSearchContainer(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        size="sm"
        radius="full"
        startContent={<FaSearch className="mx-1 text-white/50" size={13} />}
        placeholder="Search for movies or tv series"
        variant="bordered"
        labelPlacement="outside"
        isClearable
        className="w-full"
        classNames={{
          inputWrapper:
            "h-10 border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10 group-data-[focus=true]:border-primary/60 group-data-[focus=true]:bg-white/10",
          input: "text-sm text-white placeholder:text-white/40",
        }}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClear={() => setInputValue("")}
        value={inputValue}
        onFocus={() => setShowSearchContainer(true)}
        aria-expanded={Boolean(debouncedValue) && showSearchContainer}
        aria-haspopup="listbox"
      />
      {debouncedValue && showSearchContainer ? (
        <div ref={searchContainerRef}>
          <SearchContainer
            data={searchResults}
            search={debouncedValue}
            isLoading={isSearching}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
