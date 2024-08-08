import "./App.css";
import VMNavbar from "./components/common/navbar/VMNavbar";
import CardList from "./components/common/posts/CardList";
import { ToasterProvider } from "./providers/ToasterProvider";
import { GlobalContextProvider } from "./context/useAuth";

function App() {
  return (
    <ToasterProvider>
      <GlobalContextProvider>
        <VMNavbar />
        <CardList />
      </GlobalContextProvider>
    </ToasterProvider>
  );
}

export default App;
