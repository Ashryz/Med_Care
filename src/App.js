import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectReg from "./Pages/SignUp/selectReg.js";
import SignIn from "./Pages/SignIn/SignIn.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Pages/SignIn/ForgotPassword.js";
import Userprofile from "./Pages/UserProfile/Userprofile.js";
import ChangePass from "./Components/UserProfile/ChangePass/ChangePass";
import ChangeDPass from "./Components/DoctorProfile/ChangeDPass/ChangeDPass";
import MyInsurance from "./Components/UserProfile/MyInsurance/MyInsurance";
import NavbarComp from "./Components/Navbar/Navbar.js";
import Home from "./Home.js";
import ListDoctor from "./Components/ListDoctor/ListDoctor.js";
import DoctorProfile from "./Pages/DoctorProfile/DoctorProfile.js";
// import Hero from "./Components/Hero/Hero.js";
import Hero from "./Pages/Hero/Hero.js";
import FooterComp from "./Components/Footer/Footer.js";
import Error from "./Components/Error/Error.js";
import SearchResults from "./Components/Search/SearchResults.js";
import Review from "./Pages/review/Review.js";
import DoctorCard from "./Components/Doctors/DoctorCard.js";
// import DoctorDetails from "./Components/Doctors/DoctorDetails.js";
import DoctorDetails from "./Pages/Doctors/DoctorDetails.js";
import { ViewAppointment } from "./Pages/ViewAppointment/ViewAppointment.js";
import { Schadule } from "./Components/ViewAppointment/Schadule.js";
import Dashboard from "./Components/ViewAppointment/Dashboard.js";
import { useSelector } from "react-redux";

function App() {

  const myTheme = useSelector((state) => state.combineThemes.theme)
  return (
    <div className={`App ${myTheme === "light"? "":"bg-dark text-white"}`}>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/main" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SelectReg />} />
          <Route exact path="/Userprofile" element={<Userprofile />} />
          <Route exact path="/changepassword" element={<ChangePass />} />
          <Route exact path="/changedDpassword" element={<ChangeDPass />} />
          <Route exact path="/MyInsurance" element={<MyInsurance />} />
          <Route exact path="/Listdoctor" element={<ListDoctor />} />
          <Route exact path="/DoctorProfile" element={<DoctorProfile />} />
          <Route exact path="/search/:query" element={<SearchResults />} />
          <Route exact path="/Hero" element={<Hero />} />
          <Route exact path="/review" element={<Review />} />
          <Route exact path="/DoctorCard" element={<DoctorCard />} />
          <Route exact path="/DoctorDetails/:id" element={<DoctorDetails />} />
          {/* <Route exact path="/DoctorDetl" element={<DoctorDetal/>}/>  */}
          <Route exact path="/viewappointment" element={<ViewAppointment />} />
          <Route exact path="/Schadule" element={<Schadule />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>

      {/* <SelectReg/> */}
    </div>
  );
}

export default App;
