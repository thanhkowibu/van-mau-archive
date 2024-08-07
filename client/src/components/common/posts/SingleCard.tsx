import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../../context/useAuth";
import UpdatePostModal from "../modal/UpdatePostModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeletePostModal from "../modal/DeletePostModal";

type Props = {
  content: string;
  tags: string[];
  username: string;
  uid: number;
  id: number;
};

const SingleCard: React.FC<Props> = ({ content, tags, username, uid, id }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
    <div className=" bg-[#1E293B] px-5 py-3 rounded-xl w-96 overflow-hidden flex flex-col gap-3 h-min">
      <div className="flex justify-between">
        <div className="text-gray-500 text-sm tracking-wide">@{username}</div>
        <div className="flex flex-row-reverse items-start gap-3">
          <button
            onClick={handleCopy}
            className="pt-1 text-gray-300 rounded-xl opacity-40 hover:opacity-90 transition duration-300"
          >
            <FaRegCopy />
          </button>
          {user?.id === uid && (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:border-none focus-visible:border-none">
                <div className="pt-1 text-gray-300 rounded-xl opacity-40 hover:opacity-90 transition duration-300 cursor-pointer">
                  <FaRegEdit />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-700 text-gray-300 focus:border-none hover:border-none">
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteOpen(true)}
                  className="text-red-400"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
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
      <UpdatePostModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialContent={content}
        initialTags={tags}
        id={id}
      />
      <DeletePostModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={id}
      />
    </div>
  );
};

export default SingleCard;
