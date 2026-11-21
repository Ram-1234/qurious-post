import { HashRouter, BrowserRouter} from 'react-router-dom';
import './App.css';
import { RoutePage1} from "./route";
import {Navbar} from "./components";


function App() {
  return (
    <BrowserRouter>
        <header>
          <Navbar/>
        </header>
        <RoutePage1/>
      </BrowserRouter>
  );
}

export default App;
