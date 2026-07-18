import SearchIcon from "@/assets/icons/search";

const SearchInput = () => {
  return (
    <div className="flex gap-2 border w-full border-gray-500 max-w-80 p-1 items-center rounded-md">
      <SearchIcon w="24px" h="24px" color="gray" />
      <input placeholder="enter something" className="w-full border-0 focus:outline-0" />
    </div>
  );
};

export default SearchInput;
