import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DoneeLogin from "./pages/donee/DoneeLogin";
import DoneeRegister from "./pages/donee/DoneeRegister";
import DonorLogin from "./pages/donor/DonorLogin";
import DonorRegister from "./pages/donor/DonorRegister";
import About from "./pages/About";
import Main from "./pages/Main";
import DoneeDashboard from "./pages/donee/DoneeDashboard";
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonationDetails from "./pages/donor/DonationDetails";
import DonorProfile from "./pages/donor/DonorProfile";
import AvailbaleDonations from "./pages/donee/AvailbaleDonations";
import NewDonation from "./pages/donor/NewDonation";


function App() {
  return (
    <div className="App font-Manrope">
      <Router>
        <Routes>
          <Route element={<Main />}>

            <Route path='' element={<Home />} />
            <Route path='/donee_login' element={<DoneeLogin />} />
            <Route path='/donee_register' element={<DoneeRegister />} />
            <Route path='/donor_login' element={<DonorLogin />} />
            <Route path='/donor_register' element={<DonorRegister />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route path='/donee/dashboard' element={<DoneeDashboard />} >
          </Route>
          <Route path='/donor/dashboard' element={<DonorDashboard />} >

          </Route>
          <Route path="/donee/dashboard/donationDetails/:donationId" element={<DonationDetails />} />
          <Route path="/donor/dashboard/donationDetails/:donationId" element={<DonationDetails />} />
          <Route path="/donor/dashboard/donorProfile" element={<DonorProfile />} />
          <Route path="/donor/newDonation" element={<NewDonation />} />
          <Route path="/donee/dashboard/dry_fruits" element={<AvailbaleDonations />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
