import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectReg from './Components/SignUp/utils/pages/selectReg.js';
import SignIn from './Pages/SignIn/SignIn.js'
import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './Pages/SignIn/ForgotPassword.js';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SelectReg/>}/>
        </Routes>
      </BrowserRouter>
      {/* <SelectReg/> */}


    </div>
  );
}

export default App;
