import "./App.css";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import "bootstrap/dist/css/bootstrap.min.css";
import SelectReg from "./Pages/SignUp/selectReg.js";
import SignIn from "./Pages/SignIn/SignIn.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Pages/SignIn/ForgotPassword.js";
import Userprofile from "./Pages/UserProfile/Userprofile.js";
import ChangePass from "./Components/UserProfile/ChangePass/ChangePass";
import ChangeDPass from "./Components/DoctorProfile/ChangeDPass/ChangeDPass";
import AdditionalInfo from "./Components/DoctorProfile/additionalinfo/additionalinfo";
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
import AppointmentCount from "./Pages/ViewAppointment/AppointmentCount.js";
import { Schadule } from "./Components/ViewAppointment/Schadule.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import AddOffer from "./Components/Dashboard/AddOffer.js";
import Appointments from "./Components/Dashboard/Appointments.js";
import AddSchedule from "./Components/Dashboard/AddSchedule.js";
import ViewSchedule from "./Components/Dashboard/ViewSchedule.js";
import Rating from "./Components/Dashboard/Rating.js";
import { useSelector } from "react-redux";
import Contact from "./Pages/Flink/Contactus/Contact.js";
import Teams from "./Pages/Flink/Teams/Teams.js";
import Medical from "./Pages/Flink/Medical.js";
import OurTeam from "./Pages/Flink/OurTeam/OurTeam.js";
import Privacy from "./Pages/Flink/privcy/Privacy_Policy.js";
import DoctorOffers from "./Components/Dashboard/DoctorOffers.js";
import Success from "./Pages/Success/Success.js";
function App() {
  const myTheme = useSelector((state) => state.combineThemes.theme);
  return (
    <div className={`App ${myTheme === "light" ? "" : "bg-dark text-white"}`}>
      <BrowserRouter>
        <AuthProvider>
          <NavbarComp />
          <Routes>
            <Route path="/main" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SelectReg />} />
            <Route path="/payment/?" element={<Success />} />
            <Route exact path="/Userprofile" element={<Userprofile />} />
            <Route exact path="/changepassword" element={<ChangePass />} />
            <Route exact path="/changedDpassword" element={<ChangeDPass />} />
            <Route exact path="/additionalinfo" element={<AdditionalInfo />} />
            <Route exact path="/Listdoctor" element={<ListDoctor />} />
            <Route exact path="/DoctorProfile" element={<DoctorProfile />} />
            <Route exact path="/search/:query" element={<SearchResults />} />
            <Route exact path="/Hero" element={<Hero />} />
            <Route exact path="/review" element={<Review />} />
            <Route exact path="/DoctorCard" element={<DoctorCard />} />
            <Route
              exact
              path="/DoctorDetails/:id"
              element={<DoctorDetails />}
            />
            <Route
              exact
              path="/viewappointment"
              element={<ViewAppointment />}
            />
            <Route exact path="/Schadule" element={<Schadule />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/Appointments" element={<Appointments />} />
            <Route exact path="/Medical" element={<Medical />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/tems" element={<Teams />} />
            <Route exact path="/AddSchedule" element={<AddSchedule />} />
            <Route exact path="/ViewSchedule" element={<ViewSchedule />} />
            <Route
              exact
              path="/AppointmentCount"
              element={<AppointmentCount />}
            />
            <Route exact path="/AddOffer" element={<AddOffer />} />
            <Route exact path="/Rating" element={<Rating />} />
            <Route exact path="/Our" element={<OurTeam />} />
            <Route exact path="/pri" element={<Privacy />} />
            <Route exact path="/DoctorOffers" element={<DoctorOffers />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <FooterComp />
        </AuthProvider>
      </BrowserRouter>

      {/* <SelectReg/> */}
    </div>
  );
}

export default App;
