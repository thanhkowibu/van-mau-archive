import { useState } from "react";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { useAuth } from "../../../context/useAuth";
import CreatePostModal from "../modal/CreatePostModal";

type Props = {};

const VMNavbar: React.FC<Props> = ({}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className=" border-gray-200 pt-2 pb-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://www.youtube.com/watch?v=QB7ACr7pUuE"
          className="bg-slate-100 hover:opacity-80 transition rounded-xl flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.png" className="h-14" alt="Logo" />
        </a>
        <div className="flex gap-6 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={() => {
              if (!user) setIsLoginOpen(true);
              else setIsCreatePostOpen(true);
            }}
            type="button"
            className="text-white focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center bg-slate-800 border-2 border-slate-700 hover:bg-slate-900"
          >
            🔥✍️
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              type="button"
              className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-sky-500 hover:bg-sky-600 border-2 border-slate-700"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsRegisterOpen(true)}
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-slate-800 border-2 border-slate-700 hover:bg-slate-900"
              >
                Register
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-sky-500 hover:bg-sky-600 border-2 border-slate-700"
              >
                Login
              </button>
            </>
          )}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block w-96">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
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
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        setOtherOpen={setIsRegisterOpen}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        setOtherOpen={setIsLoginOpen}
      />
      <CreatePostModal
        isOpen={isCreatePostOpen}
        setIsOpen={setIsCreatePostOpen}
      />
    </nav>
  );
};

export default VMNavbar;
