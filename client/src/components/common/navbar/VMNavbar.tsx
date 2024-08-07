import { useState } from "react";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { useAuth } from "../../../context/useAuth";
import CreatePostModal from "../modal/CreatePostModal";
import Searchbar from "./Searchbar";

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
    <nav className="border-gray-200 pt-2 pb-6">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://www.youtube.com/watch?v=QB7ACr7pUuE"
          className="bg-slate-100 hover:opacity-80 transition rounded-xl flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.png" className="h-10 xl:h-14" alt="Logo" />
        </a>
        <div className="flex md:gap-6 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <button
                onClick={() => {
                  if (!user) setIsLoginOpen(true);
                  else setIsCreatePostOpen(true);
                }}
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-sm p-1 md:p-2 text-center bg-slate-800 border-2 border-slate-700 hover:bg-slate-900"
              >
                🔥✍️
              </button>
              <button
                onClick={handleLogout}
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 text-center bg-sky-500 hover:bg-sky-600 border-2 border-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsRegisterOpen(true)}
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 text-center bg-slate-800 border-2 border-slate-700 hover:bg-slate-900"
              >
                Register
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 text-center bg-sky-500 hover:bg-sky-600 border-2 border-slate-700"
              >
                Login
              </button>
            </>
          )}
        </div>

        <Searchbar />
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
