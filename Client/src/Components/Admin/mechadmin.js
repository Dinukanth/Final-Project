// src/components/Mechadmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mechadmin.css';

const Mechadmin = () => {
    const [mechanics, setMechanics] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3004/mech/get')
            .then(response => setMechanics(response.data))
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
            const response = await fetch(`http://localhost:3004/mech/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMechanics(mechanics.filter(mechanic => mechanic._id !== id));
        } catch (error) {
            console.error("Failed to delete mechanic:", error);
            setError('Failed to delete mechanic.');
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>What type mechanic</th>
                        <th>Phonenumber</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
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
                                <button onClick={() => handleEdit(mechanic._id)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(mechanic._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Mechadmin;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './mechadmin.css';

// const Mechadmin = () => {
//     const [mechanics, setMechanics] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:3004/mech/get')
//             .then(response => setMechanics(response.data))
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//                 setError('An error occurred while fetching users. Please try again later.');
//             });
//     }, []);


//     const handleEdit = (id) => {
//         // Handle edit action
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:3004/mech/delete/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             // setMechanics(mechanics.filter(mechanic => mechanic._id !== id));
//         } catch (error) {
//             console.error("Failed to delete mechanic:", error);
//             setError('Failed to delete mechanic.');
//         }
//     };

//     return (
//         <div>
//             {error && <div className="error-message">{error}</div>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User Name</th>
//                         <th>What type mechanic</th>
//                         <th>Phonenumber</th>
//                         <th>Location</th>
//                         <th>Email</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {mechanics.map(mechanic => (
//                         <tr key={mechanic._id}>
//                             <td>{mechanic.Name}</td>
//                             <td>{mechanic.WhatkindofMechanic}</td>
//                             <td>{mechanic.Phonenumber}</td>
//                             <td>{mechanic.Address}</td>
//                             <td>{mechanic.Email}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(mechanic._id)}>Edit</button>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDelete(mechanic._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Mechadmin;


















// import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; // No longer needed if you're using fetch
// import './mechadmin.css';

// const Mechadmin = () => {
//     const [mechanics, setMechanics] = useState([]);

//     useEffect(() => {
//         const fetchMechanics = async () => {
//             try {
//                 const response = await fetch('http://localhost:3004/api/mechanics'); // Adjust URL as needed
//                 const data = await response.json();
//                 setMechanics(data);
//             } catch (error) {
//                 console.error("Failed to fetch mechanics:", error);
//             }
//         };

//         fetchMechanics();
//     }, []);

//     const handleEdit = (id) => {
//         // Handle edit action
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:3004/api/mechanics/${id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 setMechanics(mechanics.filter(mechanic => mechanic._id !== id));
//             } else {
//                 console.error("Failed to delete mechanic:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Failed to delete mechanic:", error);
//         }
//     };

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
//                 {mechanics.map(mechanic => (
//                     <tr key={mechanic._id}>
//                         <td>{mechanic.Name}</td>
//                         <td>{mechanic.WhatkindofMechanic}</td>
//                         <td>{mechanic.Address}</td>
//                         <td>{mechanic.Email}</td>
//                         <td>
//                             <button onClick={() => handleEdit(mechanic._id)}>Edit</button>
//                         </td>
//                         <td>
//                             <button onClick={() => handleDelete(mechanic._id)}>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default Mechadmin;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './mechadmin.css';

// const Mechadmin = () => {
//     const [mechanics, setMechanics] = useState([]);

//     useEffect(() => {
//         const fetchMechanics = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3004/api/mechanics'); // Adjust URL as needed
//                 setMechanics(response.data);
//             } catch (error) {
//                 console.error("Failed to fetch mechanics:", error);
//             }
//         };

//         fetchMechanics();
//     }, []);

//     const handleEdit = (id) => {
//         // Handle edit action
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3004/api/mechanics/${id}`); // Adjust URL as needed
//             setMechanics(mechanics.filter(mechanic => mechanic._id !== id));
//         } catch (error) {
//             console.error("Failed to delete mechanic:", error);
//         }
//     };

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
//                 {mechanics.map(mechanic => (
//                     <tr key={mechanic._id}>
//                         <td>{mechanic.Name}</td>
//                         <td>{mechanic.WhatkindofMechanic}</td>
//                         <td>{mechanic.Address}</td>
//                         <td>{mechanic.Email}</td>
//                         <td>
//                             <button onClick={() => handleEdit(mechanic._id)}>Edit</button>
//                         </td>
//                         <td>
//                             <button onClick={() => handleDelete(mechanic._id)}>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default Mechadmin;



























// import React, { useState } from 'react';
// // import '../Admin/mechadmin.css'
// import './mechadmin.css';

// const Mechadmin = () => {
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

// export default Mechadmin;
