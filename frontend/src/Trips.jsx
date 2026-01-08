import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Trips() {
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState({
        id: '',
        destination: '',
        description: '',
        price: '',
        image_url: ''
    });
    const [editingTrip, setEditingTrip] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        fetch('/trips?include=travelers')
            .then((res) => res.json())
            .then((data) => setTrips(Array.isArray(data) ? data : []))
            .catch((err) => console.error(err));
    };

    const addTrip = (event) => {
        event.preventDefault();
        fetch('/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrip),
        })
            .then((res) => res.json())
            .then(() => {
                setNewTrip({
                    id: '',
                    destination: '',
                    description: '',
                    price: '',
                    image_url: ''
                });
                fetchTrips();
            })
            .catch((err) => console.error(err));
    };

    const startEditing = (trip) => {
        setEditingTrip(trip);
    };

    const updateTrip = (event) => {
        event.preventDefault();
        if (!editingTrip) return;

        fetch(`/trips/${editingTrip.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingTrip),
            })
            .then((res) => res.json())
            .then(() => {
                setEditingTrip(null);
                fetchTrips();
            })
            .catch((err) => console.error(err));
    };

    const deleteTrip = (id) => {
        fetch(`/trips/${id}`,
            {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(() => fetchTrips())
            .catch((err) => console.error(err));
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.contentWrapper}>
                <button style={styles.backButton} onClick={() => navigate('/')}>← Nazad na početnu</button>
                <h1 style={styles.title}>Putovanja</h1>

                <form onSubmit={addTrip} style={styles.form}>
                <h3>Dodaj novo putovanje</h3>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="ID"
                    value={newTrip.id}
                    onChange={(e) => setNewTrip({ ...newTrip, id: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Destination"
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Description"
                    value={newTrip.description}
                    onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="number"
                    placeholder="Price"
                    value={newTrip.price}
                    onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="url"
                    placeholder="Image URL"
                    value={newTrip.image_url}
                    onChange={(e) => setNewTrip({ ...newTrip, image_url: e.target.value })}
                />
                <button style={styles.button} type="submit">Dodaj</button>
                </form>

                {editingTrip && (
                    <form onSubmit={updateTrip} style={styles.form}>
                    <h3>Ažuriraj putovanje</h3>
                    <p>ID: {editingTrip.id}</p>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Destination"
                        value={editingTrip.destination}
                        onChange={(e) => setEditingTrip({ ...editingTrip, destination: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Description"
                        value={editingTrip.description}
                        onChange={(e) => setEditingTrip({ ...editingTrip, description: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="number"
                        placeholder="Price"
                        value={editingTrip.price}
                        onChange={(e) => setEditingTrip({ ...editingTrip, price: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="url"
                        placeholder="Image URL"
                        value={editingTrip.image_url || ''}
                        onChange={(e) => setEditingTrip({ ...editingTrip, image_url: e.target.value })}
                    />
                        <button style={styles.button} type="submit">Sačuvaj</button>
                        <button style={styles.buttonCancel} type="button" onClick={() => setEditingTrip(null)}>Odustani</button>
                    </form>
                )}

                <div>
                    <h3 style={styles.subTitle}>Lista putovanja</h3>
                    {trips.length === 0 ? (
                        <p>Nema upisanih putovanja</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.tableHeaderCell}>ID</th>
                                <th style={styles.tableHeaderCell}>Destinacija</th>
                                <th style={styles.tableHeaderCell}>Opis</th>
                                <th style={styles.tableHeaderCell}>Cijena (KM)</th>
                                <th style={styles.tableHeaderCell}>Slika</th>
                                <th style={styles.tableHeaderCell}>Putnici</th>
                                <th style={styles.tableHeaderCell}>Akcije</th>
                            </tr>                            </thead>
                            <tbody>
                            {trips.map((trip) => (
                                <tr key={trip.id}>
                                    <td style={styles.tableCell}>{trip.id}</td>
                                    <td style={styles.tableCell}>{trip.destination}</td>
                                    <td style={styles.tableCell}>{trip.description}</td>
                                    <td style={styles.tableCell}>{trip.price}</td>
                                    <td style={styles.tableCell}>
                                        <img
                                            src={trip.image_url || 'https://via.placeholder.com/120'}
                                            alt={trip.destination}
                                            style={styles.thumbnail}
                                        />
                                    </td>
                                    <td style={styles.tableCell}>
                                        {trip.travelers && trip.travelers.length > 0 ? (
                                            <ul style={styles.list}>
                                                {trip.travelers.map((traveler) => (
                                                    <li key={traveler.id}>
                                                        {traveler.name} ({traveler.age})
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>Nema putnika</span>
                                        )}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button style={styles.buttonSmall} onClick={() => startEditing(trip)}>Edit</button>
                                        <button style={styles.buttonDelete} onClick={() => deleteTrip(trip.id)}>Obriši</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
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
    contentWrapper: {
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto'
    },
    backButton: {
        backgroundColor: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '10px',
        cursor: 'pointer'
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
        borderRadius: '10px'
    },
    input: {
        display: 'block',
        marginBottom: '10px',
        padding: '8px',
        width: '260px',
    },
    button: {
        backgroundColor: '#20b2aa',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        marginRight: '10px',
        cursor: 'pointer',
        borderRadius: '10px'
    },
    buttonCancel: {
        backgroundColor: '#c62828',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '10px'
    },
    buttonSmall: {
        backgroundColor: '#20b2aa',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        marginRight: '5px',
        cursor: 'pointer',
        borderRadius: '10px'
    },
    buttonDelete: {
        backgroundColor: '#c62828',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '10px'
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        textAlign: 'left',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    thumbnail: {
        width: '120px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '10px'
    },
    tableHeaderCell: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '1px solid #cfd8dc'
    },
    tableCell: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '1px solid #e0e0e0'

    },
    list: {
        margin: 0,
        paddingLeft: '18px'
}
};

export default Trips;