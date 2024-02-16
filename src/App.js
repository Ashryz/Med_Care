import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectReg from './Components/SignUp/utils/pages/selectReg.js';
import NavbarComp from './Components/Navbar/Navbar.js';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComp />
      <SelectReg/>
      </BrowserRouter>
    </div>
  );
}

export default App;
