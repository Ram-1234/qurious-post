import { HashRouter} from 'react-router-dom';
import './App.css';
import { RoutePage1} from "./route";
import Navbar from './navbar';


function App() {
  return (
    <HashRouter>
        <header><Navbar/></header>
        <RoutePage1/>
      </HashRouter>
  );
}

export default App;
