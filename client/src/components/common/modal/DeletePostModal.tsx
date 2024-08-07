import { useState } from "react";
import toast from "react-hot-toast";
import usePostApi from "../../../api/modules/post.api";
import { cn } from "../../../lib/utils";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const DeletePostModal: React.FC<Props> = ({ isOpen, setIsOpen, id }) => {
  const [loading, setLoading] = useState(false);

  const { deletePost } = usePostApi();

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await deletePost(id);
      toast.success(res.data);
      setIsOpen(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
          aria-hidden="true"
          className="flex bg-black/30 backdrop-blur-[1px] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-4 w-full max-w-md max-h-full"
          >
            {/* Modal content */}
            <div className="relative rounded-lg shadow bg-gray-700">
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 w-12 h-12 text-gray-200"
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
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-400">
                  Are you sure you want to delete this?
                </h3>
                <button
                  onClick={onSubmit}
                  data-modal-hide="popup-modal"
                  type="button"
                  disabled={loading}
                  className={cn(
                    "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center",
                    {
                      "bg-gray-500 hover:bg-gray-500 select-none cursor-progress":
                        loading,
                    }
                  )}
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePostModal;
