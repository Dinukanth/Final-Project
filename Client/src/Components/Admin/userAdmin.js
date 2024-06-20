import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userAdmin.css';
import { Admin } from './Admin';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Email: ''
    });

    useEffect(() => {
        axios.get('https://final-project-2vgx.onrender.com/user/get')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('An error occurred while fetching users. Please try again later.');
            });
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user._id);
        setActionType('edit');
        setFormData({ Name: user.Name, Email: user.Email });
    };

    const handleDelete = (id) => {
        setSelectedUser(id);
        setActionType('delete');
    };

    const confirmAction = async () => {
        if (actionType === 'delete') {
            try {
                const response = await fetch(`https://final-project-2vgx.onrender.com/user/delete/${selectedUser}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setUsers(users.filter(user => user._id !== selectedUser));
            } catch (error) {
                console.error("Failed to delete user:", error);
                setError('Failed to delete user.');
            }
        } else if (actionType === 'edit') {
            try {
                const response = await fetch(`https://final-project-2vgx.onrender.com/user/update/${selectedUser}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedUser = await response.json();
                setUsers(users.map(user => user._id === selectedUser ? updatedUser : user));
            } catch (error) {
                console.error("Failed to update user:", error);
                setError('Failed to update user.');
            }
        }
        setSelectedUser(null);
        setActionType('');
    };

    const closeModal = () => {
        setSelectedUser(null);
        setActionType('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <Admin />
            <div className='dinu-user'>
                {error && <div className="error-message">{error}</div>}
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedUser && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            {actionType === 'delete' ? (
                                <div>
                                    <p>Are you sure you want to delete this user?</p>
                                    <div className="modal-actions">
                                        <button onClick={confirmAction}>Yes</button>
                                        <button onClick={closeModal}>No</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3>Edit User</h3>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleChange}
                                    />
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                    />
                                    <div className="modal-actions">
                                        <button onClick={confirmAction}>Save</button>
                                        <button onClick={closeModal}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAdmin;








