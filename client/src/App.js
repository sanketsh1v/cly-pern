import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Component */}
      <Hero />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
