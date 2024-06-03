import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mechadmin.css';
import { Admin } from './Admin';

const Mechadmin = () => {
    const [mechanics, setMechanics] = useState([]);
    const [error, setError] = useState('');
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [mechanicToDelete, setMechanicToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [mechanicToEdit, setMechanicToEdit] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3004/mech/get')
            .then(response => setMechanics(response.data))
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('An error occurred while fetching users. Please try again later.');
            });
    }, []);

    const handleEdit = (mechanic) => {
        setMechanicToEdit(mechanic);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setMechanicToEdit({
            ...mechanicToEdit,
            [name]: value
        });
    };

    const confirmEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3004/mech/update/${mechanicToEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mechanicToEdit)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedMechanic = await response.json();
            setMechanics(mechanics.map(mechanic =>
                mechanic._id === updatedMechanic._id ? updatedMechanic : mechanic
            ));
            setMechanicToEdit(null);
        } catch (error) {
            console.error("Failed to update mechanic:", error);
            setError('Failed to update mechanic.');
        }
    };

    const confirmDelete = async () => {
        if (!mechanicToDelete) return;

        try {
            const response = await fetch(`http://localhost:3004/mech/delete/${mechanicToDelete._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMechanics(mechanics.filter(mechanic => mechanic._id !== mechanicToDelete._id));
            setShowDeleteModal(false);
            setMechanicToDelete(null);
        } catch (error) {
            console.error("Failed to delete mechanic:", error);
            setError('Failed to delete mechanic.');
            setShowDeleteModal(false);
            setMechanicToDelete(null);
        }
    };

    const handleDelete = (mechanic) => {
        setMechanicToDelete(mechanic);
        setShowDeleteModal(true);
    };

    const handleLocation = (mechanic) => {
        setSelectedMechanic(mechanic);
    };

    const closeModal = () => {
        setSelectedMechanic(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setMechanicToDelete(null);
    };

    const closeEditModal = () => {
        setMechanicToEdit(null);
    };

    return (
        <div>
            <Admin />
            <div className='ad-maechad'>
                {error && <div className="error-message">{error}</div>}
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>What type mechanic</th>
                            <th>Phonenumber</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Mechanic Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mechanics.map(mechanic => (
                            <tr key={mechanic._id}>
                                <td>{mechanic.Name}</td>
                                <td>{mechanic.WhatkindofMechanic}</td>
                                <td>{mechanic.Phonenumber}</td>
                                <td>{mechanic.Address}</td>
                                <td>{mechanic.Email}</td>
                                <td>
                                    <button onClick={() => handleEdit(mechanic)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(mechanic)}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => handleLocation(mechanic)}>Location</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedMechanic && (
                    <div className="modal-map">
                        <div className="modal-content-map">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h3>{selectedMechanic.Name}</h3>
                            <p>{selectedMechanic.Address}</p>
                            {selectedMechanic.latitude && selectedMechanic.longitude ? (
                                <iframe
                                    width="600"
                                    height="450"
                                    src={`https://www.google.com/maps?q=${selectedMechanic.latitude},${selectedMechanic.longitude}&hl=es;z=14&output=embed`}
                                    title={selectedMechanic.Name}
                                    style={{ border: 0 }}
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <p>Location data not available</p>
                            )}
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeDeleteModal}>&times;</span>
                            <h3>Are you sure you want to delete {mechanicToDelete.Name}?</h3>
                            <div className="modal-actions">
                                <button onClick={confirmDelete}>Yes</button>
                                <button onClick={closeDeleteModal}>No</button>
                            </div>
                        </div>
                    </div>
                )}
                {mechanicToEdit && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeEditModal}>&times;</span>
                            <h3>Edit Mechanic</h3>
                            <form onSubmit={confirmEdit}>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={mechanicToEdit.Name}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>What kind of Mechanic:</label>
                                    <input
                                        type="text"
                                        name="WhatkindofMechanic"
                                        value={mechanicToEdit.WhatkindofMechanic}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        name="Phonenumber"
                                        value={mechanicToEdit.Phonenumber}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Address:</label>
                                    <input
                                        type="text"
                                        name="Address"
                                        value={mechanicToEdit.Address}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={mechanicToEdit.Email}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={closeEditModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mechadmin;




