import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectReg from './Components/SignUp/utils/pages/selectReg.js';
import SignIn from './Pages/SignIn/SignIn.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './Pages/SignIn/ForgotPassword.js';
import Userprofile from './Components/UserProfile/Userprofile';
import ChangePass from './Components/ChangePass/ChangePass';
import NavbarComp from './Components/Navbar/Navbar.js';
import Home from './Home.js';
import ListDoctor from './Components/ListDoctor/ListDoctor.js';
import DoctorProfile from './Components/DoctorProfile/DoctorProfile';
import Hero from './Components/Hero/Hero.js';
import FooterComp from './Components/Footer/Footer.js';
import Error from './Components/Error/Error.js';
import SearchResults from './Components/Search/SearchResults.js';
import Review from './Pages/review/Review.js';
import DoctorCard from './Components/Doctors/DoctorCard.js';
import DoctorDetails from './Components/Doctors/DoctorDetails.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path='/main' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SelectReg />} />
          <Route exact path="/Userprofile" element={<Userprofile />} />
          <Route exact path="/changepassword" element={<ChangePass />} />
          <Route exact path="/Listdoctor" element={<ListDoctor />} />
          <Route exact path="/DoctorProfile" element={<DoctorProfile />} />
          <Route exact path="/search/:query" element={<SearchResults />} />
          <Route exact path="/Hero" element={<Hero />} />
          <Route exact path='/review' element={<Review />} />
          <Route exact path='/DoctorCard' element={<DoctorCard/>}/>
          <Route exact path="/DoctorDetails/:id" element={<DoctorDetails/>}/> 
          <Route path='*' element={<Error />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
      {/* <SelectReg/> */}
    </div>
  );
}

export default App;
