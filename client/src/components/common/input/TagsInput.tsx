import { useState } from "react";
import { Input } from "../../ui/input";
import { IoMdCloseCircle } from "react-icons/io";

type Props = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagsInput: React.FC<Props> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const removeTags = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue !== "") {
      event.preventDefault(); // Prevent form submission
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="flex items-start flex-wrap min-h-12 gap-3">
      <div className="text-sky-300 text-sm flex flex-wrap gap-2">
        {tags.length
          ? tags.map((tag, idx) => (
              <div
                key={idx}
                className="rounded-full px-2 py-2 bg-sky-600/30 font-semibold relative"
              >
                #{tag}
                <button
                  type="button"
                  className="absolute -top-1 -right-1 hover:brightness-125"
                  onClick={() => removeTags(idx)}
                >
                  <IoMdCloseCircle size={16} />
                </button>
              </div>
            ))
          : null}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={addTags}
        placeholder="Press enter to add tags"
        className="text-sm rounded-lg block flex-1 min-w-24 p-2.5 bg-gray-600 border-gray-500 focus:border-gray-600 placeholder-gray-400 text-white ring-offset-gray-400"
      />
    </div>
  );
};

export default TagsInput;
