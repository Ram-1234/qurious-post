import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import {RoutePage, RoutePage1} from "./route";
import Navbar from './navbar';


function App() {
  return (
    <Router>
        <header><Navbar/></header>
        <RoutePage1/>
      </Router>
  );
}

export default App;
