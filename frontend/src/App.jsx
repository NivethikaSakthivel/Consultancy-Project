// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Directory from './pages/Directory';
import Directors from './pages/Directors';
import Calendar from './pages/Calendar';
import Projects from './pages/Projects';
import ClubServices from './pages/ClubServices';
import PastPresidents from './pages/PastPresidents';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/directors" element={<Directors />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/club-services" element={<ClubServices />} />
            <Route path="/past-presidents" element={<PastPresidents />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;