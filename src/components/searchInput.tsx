import SearchIcon from "@/assets/icons/search";

const SearchInput = ({
  value,
  onchange,
}: {
  value: string;
  onchange: (e: string) => void;
}) => {
  return (
    <div className="flex gap-2 border w-full border-gray-500 max-w-80 p-1 items-center rounded-md">
      <SearchIcon w="24px" h="24px" color="gray" />
      <input
        placeholder="Search Here"
        className="w-full border-0 focus:outline-0"
        value={value}
        onChange={(e) => onchange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
