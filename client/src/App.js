import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Training from './components/training/Training';
import Speakers from './components/speakers/Speakers';

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
        
      </Routes>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
