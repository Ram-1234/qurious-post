import './App.css';
import Navbar from './navbar/index';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from "./route";
//import { AuthContextProvider } from './context/auth-context';

function App() {
  console.log('hello')
  return (
    <Router>
      <div className="App">
        <header><Navbar/></header>
         <Home/>
      </div>
    </Router>
  );
}

export default App;
