import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Events from './components/events/Events';
import Training from './components/training/Training';
import Speakers from './components/speakers/Speakers';
import Admin from './components/admin/Admin';
import Console from './components/console/Console';
import About from './components/about/About';
import Pform from './components/pform/Pform';
import BlogPage from './components/blog/blog';
import Update from './components/update/Update';
import Dashboard from './components/dashboard/Dashboard';
import PaymentStatus from './components/PaymentStatus/PaymentStatus';
import ManageUsers from './components/manageUsePage/manageUsers';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar Component */}
        <Navbar />

        {/* Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<Hero />} />

        <Route path="/training" element={<Training />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/console" element={<Console />} />
        <Route path="/update" element={<Update />} />
        <Route path="/about" element={<About />} />
        <Route path="/pform" element={<Pform />} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/payment-status/:status" element={<PaymentStatus />} />
        <Route path="/manageUsePage" element={<ManageUsers/>} />
        
      </Routes>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
