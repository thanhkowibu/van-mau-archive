import React from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";

type Props = {
  content: string;
  tags: string[];
  username: string;
};

const SingleCard: React.FC<Props> = ({ content, tags, username }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success("Content copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  return (
    <div className=" bg-[#1E293B] px-5 py-3 rounded-xl w-96 overflow-hidden flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="text-gray-500 text-sm tracking-wide">@{username}</div>
        <button
          onClick={handleCopy}
          className="pt-1 text-gray-300 rounded-xl opacity-40 hover:opacity-90 transition duration-300"
        >
          <FaRegCopy />
        </button>
      </div>
      <div className="text-sky-300 text-sm flex gap-2">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="rounded-full px-2 py-1 bg-sky-600/30 font-semibold"
          >
            #{tag}
          </div>
        ))}
      </div>
      <div className="text-gray-300 text-sm text-left break-all">{content}</div>
    </div>
  );
};

export default SingleCard;
