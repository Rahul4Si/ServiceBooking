import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUpClient from "./components/SignUpClient";
import SignUpComapny from "./components/SignUpCompany";
import SignUpTypeCard from "./components/SignUpTypeCard";
import Login from "./components/Login";
import Footer from "./components/Footer";
import MyAds from "./components/MyAds";
import AllAds from "./components/AllAds";
import Booking from "./components/Booking";
import CompanyDashBoard from "./components/CompanyDashBoard";
import ClientBookings from "./components/ClientBookings";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUpTypeCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myads/:userId" element={<MyAds />} />
            <Route path="/company/dashboard/:userId" element={<CompanyDashBoard />} />
            <Route path="/all-Ads" element={<AllAds />} />
            <Route path="/booking/:adId" element={<Booking />} />
            <Route path="/my-bookings/:userId" element={<ClientBookings />} />
            <Route path="/registerClient" element={<SignUpClient />} />
            <Route path="/registerCompany" element={<SignUpComapny />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
