import "./App.css";
import VMNavbar from "./components/common/navbar/VMNavbar";
import CardList from "./components/common/posts/CardList";
import { ToasterProvider } from "./providers/ToasterProvider";
import { GlobalContextProvider } from "./context/useAuth";
import usePostApi from "./api/modules/post.api";

function App() {
  const { getProtectedPosts } = usePostApi();
  const handleClick = async () => {
    try {
      const res = await getProtectedPosts();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ToasterProvider>
      <GlobalContextProvider>
        <VMNavbar />
        <button onClick={handleClick} className="size-8 bg-white">
          Get
        </button>
        <CardList />
      </GlobalContextProvider>
    </ToasterProvider>
  );
}

export default App;
