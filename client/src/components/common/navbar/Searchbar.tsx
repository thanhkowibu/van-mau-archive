import { IoMdCloseCircle } from "react-icons/io";
import { useAuth } from "../../../context/useAuth";

type Props = {};

const Searchbar: React.FC<Props> = ({}) => {
  const {
    searchTerm,
    setSearchTerm,
    searchTags,
    setSearchTags,
    triggerSearch,
  } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Check if the input ends with a space and starts with a hashtag
    if (value.endsWith(" ") && value.startsWith("#")) {
      const newTag = value.trim();
      if (newTag.length > 1) {
        setSearchTags([...searchTags, newTag.substring(1)]); // Add the new tag without the hashtag
        setSearchTerm(""); // Clear the input
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchTerm === "" && searchTags.length > 0) {
      // Remove the last tag when Backspace is pressed and input is empty
      setSearchTags(searchTags.slice(0, -1));
    }
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  const removeTags = (indexToRemove: number) => {
    setSearchTags([
      ...searchTags.filter((_, index) => index !== indexToRemove),
    ]);
  };

  return (
    <div className="w-full md:w-auto">
      <div
        className="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <div className="relative w-full md:w-96 mt-8 md:mt-0">
          <div className="absolute inset-y-0 end-4 flex items-center ps-3 select-none">
            <svg
              onClick={triggerSearch}
              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <div className="flex items-center gap-2 border rounded-lg bg-gray-700 border-gray-600 p-2 flex-wrap">
            {searchTags.map((tag, idx) => (
              <div
                key={idx}
                className="rounded-full px-2 py-1 bg-sky-900 font-semibold text-sky-300 text-sm relative"
              >
                #{tag}
                <button
                  type="button"
                  className="absolute -top-0 -right-0 hover:brightness-125"
                  onClick={() => removeTags(idx)}
                >
                  <IoMdCloseCircle size={10} />
                </button>
              </div>
            ))}
            <input
              type="text"
              id="search-navbar"
              className="bg-transparent outline-none text-sm placeholder-gray-400 text-white flex-grow"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
