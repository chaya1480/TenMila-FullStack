import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routing";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <div className="container">
          <Routing />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
