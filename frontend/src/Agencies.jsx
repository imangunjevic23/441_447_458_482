import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Agencies() {
    const [agencies, setAgencies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/agencies')
            .then(res => res.json())
            .then(data => setAgencies(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate('/')}>← Nazad na početnu</button>
            <h1>Agencije</h1>
            <ul>
                {agencies.map(a => (
                    <li key={a.id}>{a.name} - {a.location}</li>
                ))}
            </ul>
        </div>
    );
}

export default Agencies;