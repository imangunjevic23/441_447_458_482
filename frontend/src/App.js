import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Travelers from './Travelers';
import Agencies from './Agencies'; // Novi fajl
import Trips from './Trips';       // Novi fajl

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travelers" element={<Travelers />} />
                <Route path="/agencies" element={<Agencies />} />
                <Route path="/trips" element={<Trips />} />
            </Routes>
        </Router>
    );
}
export default App;