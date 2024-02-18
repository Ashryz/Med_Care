import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectReg from './Components/SignUp/utils/pages/selectReg.js';
import SignIn from './Pages/SignIn/SignIn.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './Pages/SignIn/ForgotPassword.js';
import Userprofile from './Components/UserProfile/Userprofile';
import ChangePass from './Components/ChangePass/ChangePass';
import NavbarComp from './Components/Navbar/Navbar.js';
import Home from './Pages/SignIn/Home.js';
import ListDoctor from './Components/ListDoctor/ListDoctor.js';
import DoctorProfile from './Components/DoctorProfile/DoctorProfile';
import Hero from './Components/Hero/Hero.js';
import Homez from './Components/Home/Homez.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path='/main' element={<Home/>} />
          <Route path='/2' element={<Home/>} />
          <Route path='/' element={<Homez />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SelectReg />} />
          <Route exact path="/Userprofile" element={<Userprofile />} />
          <Route exact path="/changepassword" element={<ChangePass />} />
          <Route exact path="/Listdoctor" element={<ListDoctor/>} />
          <Route exact path="/DoctorProfile" element={ <DoctorProfile />} />
          <Route exact path="/Hero" element={ <Hero />} />
        </Routes>
      </BrowserRouter>
      {/* <SelectReg/> */}
    </div>
  );
}

export default App;
