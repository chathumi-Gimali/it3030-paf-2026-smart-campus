import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import MyBookings from './pages/MyBookings';
import Facilities from './pages/Facilities';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-52 flex flex-col min-h-screen">
              <Topbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/facilities" element={<Facilities />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;