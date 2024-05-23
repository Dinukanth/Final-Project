import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userAdmin.css';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3004/user/get')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('An error occurred while fetching users. Please try again later.');
            });
    }, []);

    const handleEdit = (id) => {
        // Handle edit action
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3004/user/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
            setError('Failed to delete user.');
        }
    };

    return (
        <div>
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
                                <button onClick={() => handleEdit(user._id)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserAdmin;



































// import React, { useState } from 'react';
// // import '../Admin/mechadmin.css'
// import '../Admin/userAdmin.css'

// const UserAdmin = () => {
//     const [users, setUsers] = useState([
//         { id: 1, name: 'Kirusi', type: 'Car Mechanic', location: 'Mulliyawalai', email: 'kirusi@example.com' },
//         { id: 2, name: 'Lachchu', type: 'Bike Mechanic', location: 'Thanneritru', email: 'lachchu@example.com' },
//         { id: 3, name: 'Joy', type: 'Bike Mechanic', location: 'Vattappalai', email: 'joy@example.com' },
//         { id: 4, name: 'Thuva', type: 'Car Mechanic', location: 'Mulliyawalai', email: 'thuva@example.com' },
//         { id: 5, name: 'Vimal', type: 'Car Mechanic', location: 'Mullaithivu', email: 'vimal@example.com' },
//         { id: 6, name: 'Jathu', type: 'Bike Mechanic', location: 'Oddosuddan', email: 'jathu@example.com' },
//         { id: 7, name: 'Dinu', type: 'Car Mechanic', location: 'Alambil', email: 'dinu@example.com' },



//         // Add more users here
//     ]);

//     const handleEdit = (id) => {
//         // Handle edit action
//     };

//     // const handleDelete = (id) => {
//     //     // Handle delete action
//     //     setUsers(users.filter(user => user.id !== id));
//     // };

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>User Name</th>
//                     <th>What type mechanic</th>
//                     <th>Location</th>
//                     <th>Email</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users.map(user => (
//                     <tr key={user.id}>
//                         <td>{user.name}</td>
//                         <td>{user.type}</td>
//                         <td>{user.location}</td>
//                         <td>{user.email}</td>
//                         <td>
//                             <button >Edit</button>

// {/* onClick={() => handleEdit(user.id)} */}
// {/* onClick={() => handleDelete(user.id)} */}

//                         </td>
//                         <td>
//                             <button >Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default UserAdmin;
