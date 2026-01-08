import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Agencies() {
    const [agencies, setAgencies] = useState([]);
    const [newAgency, setNewAgency] = useState({ name: '', address: '', email: '' });
    const [editingAgency, setEditingAgency] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = () => {
        fetch('/agencies')
            .then((res) => res.json())
            .then((data) => setAgencies(Array.isArray(data) ? data : []))
            .catch((err) => console.error('Error:', err));
    };

    const addAgency = (event) => {
        event.preventDefault();
        fetch('/agencies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAgency),
        })
            .then((res) => res.json())
            .then(() => {
                setNewAgency({ name: '', address: '', email: '' });
                fetchAgencies();
            })
            .catch((err) => console.error('Error:', err));
    };

    const startEditing = (agency) => {
        setEditingAgency(agency);
    };

    const updateAgency = (event) => {
        event.preventDefault();
        if (!editingAgency) return;

        fetch(`/agencies/${editingAgency.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingAgency),
            })
            .then((res) => res.json())
            .then(() => {
                setEditingAgency(null);
                fetchAgencies();
            })
            .catch((err) => console.error('Error:', err));
    };

    const deleteAgency = (id) => {
        fetch(`/agencies/${id}`,
            {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(() => fetchAgencies())
            .catch((err) => console.error('Error:', err));
    };


    return (
        <div style={styles.pageContainer}>
            <button onClick={() => navigate('/')}>← Nazad na početnu</button>
            <h1 style={styles.title}>Agencije</h1>

            <form onSubmit={addAgency} style={styles.form}>
                <h3>Dodaj novu agenciju</h3>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Name"
                    value={newAgency.name}
                    onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Address"
                    value={newAgency.address}
                    onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
                />
                <input
                    style={styles.input}
                    type="email"
                    placeholder="Email"
                    value={newAgency.email}
                    onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
                    required
                />
                <button style={styles.button} type="submit">Dodaj</button>
            </form>

            {editingAgency && (
                <form onSubmit={updateAgency} style={styles.form}>
                    <h3>Ažuriraj agenciju</h3>
                    <p>ID: {editingAgency.id}</p>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Name"
                        value={editingAgency.name}
                        onChange={(e) => setEditingAgency({ ...editingAgency, name: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Address"
                        value={editingAgency.address || ''}
                        onChange={(e) => setEditingAgency({ ...editingAgency, address: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={editingAgency.email}
                        onChange={(e) => setEditingAgency({ ...editingAgency, email: e.target.value })}
                        required
                    />
                    <button style={styles.button} type="submit">Sačuvaj</button>
                    <button style={styles.buttonCancel} type="button" onClick={() => setEditingAgency(null)}>Odustani</button>
                </form>
            )}

            <div>
                <h3 style={styles.subTitle}>Lista agencija</h3>
                {agencies.length === 0 ? (
                    <p>Nema upisanih agencija</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Naziv</th>
                            <th>Adresa</th>
                            <th>Email</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {agencies.map((agency) => (
                            <tr key={agency.id}>
                                <td>{agency.id}</td>
                                <td>{agency.name}</td>
                                <td>{agency.address}</td>
                                <td>{agency.email}</td>
                                <td>
                                    <button style={styles.buttonSmall} onClick={() => startEditing(agency)}>Edit</button>
                                    <button style={styles.buttonDelete} onClick={() => deleteAgency(agency.id)}>Obriši</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        padding: '20px',
        backgroundColor: '#e0f2f1',
        minHeight: '100vh'
    },
    title: {
        color: '#00695c'
    },
    subTitle: {
        color: '#004d40'
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '8px'
    },
    input: {
        display: 'block',
        marginBottom: '10px',
        padding: '8px',
        width: '240px',
    },
    button: {
        backgroundColor: '#20b2aa',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        marginRight: '10px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    buttonCancel: {
        backgroundColor: '#c62828',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    buttonSmall: {
        backgroundColor: '#20b2aa',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        marginRight: '5px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    buttonDelete: {
        backgroundColor: '#c62828',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%'
    },
};

export default Agencies;