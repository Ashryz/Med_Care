import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectReg from './Components/SignUp/utils/pages/selectReg.js';
<<<<<<< HEAD
import NavbarComp from './Components/Navbar/Navbar.js';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComp />
      <SelectReg/>
      </BrowserRouter>
=======
import SignIn from './Pages/SignIn/SignIn.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './Pages/SignIn/ForgotPassword.js';
import Userprofile from './Components/UserProfile/Userprofile';
import ChangePass from './Components/ChangePass/ChangePass';
import Home from './Pages/SignIn/Home.js';



function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SelectReg />} />
          <Route exact path="/Userprofile" element={<Userprofile />} />
          <Route exact path="/changepassword" element={<ChangePass />} />
        </Routes>
      </BrowserRouter>
      {/* <SelectReg/> */}


>>>>>>> main
    </div>
  );
}

export default App;
