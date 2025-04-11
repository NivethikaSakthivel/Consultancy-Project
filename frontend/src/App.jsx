// App.jsx (updated)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Directory from './pages/Directory';
import Directors from './pages/Directors';
import Calendar from './pages/Calendar';
import Projects from './pages/Projects';
import ClubServices from './pages/ClubServices';
import PastPresidents from './pages/PastPresidents';
import BudgetLogin from './pages/BudgetLogin';
import BudgetDashboard from './pages/BudgetDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { BudgetProvider } from './context/BudgetContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { ServicesProvider } from './context/ServicesContext';

const App = () => {
  return (
    <AuthProvider>
      <BudgetProvider>
        <ProjectsProvider>
          <ServicesProvider>
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
                    <Route path="/budget-login" element={<BudgetLogin />} />
                    {/* Protected Route */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/budget-dashboard" element={<BudgetDashboard />} />
                    </Route>
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </ServicesProvider>
        </ProjectsProvider>
      </BudgetProvider>
    </AuthProvider>
  );
};

export default App;