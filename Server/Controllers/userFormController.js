// const UserForm = require('../Models/Userform.model');
// const Mechanic = require('../Models/Mechanics.model');
// const MechOrder = require('../Models/Order.model'); // Assuming you have a model for orders

// let io;

// const setSocketIOInstance = (socketIOInstance) => {
//     io = socketIOInstance;
// };

// const createUserForm = async (req, res) => {
//     try {
//         const form = new UserForm(req.body);  
//         const savedForm = await form.save();  

//         if (io) {
//             io.emit('newUserForm', savedForm); 
//         }

//         res.status(201).json({ message: 'Form created successfully', form: savedForm });
//     } catch (error) {
//         console.error('Error creating user form:', error);
//         res.status(500).json({ message: 'Failed to create form' });
//     }
// };

// const getUserForms = async (req, res) => {
//     try {
//         const forms = await UserForm.find();  
//         res.status(200).json(forms);
//     } catch (error) {
//         console.error('Error fetching user forms:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;  
//     const toRadians = angle => angle * Math.PI / 180;  
//     const dLat = toRadians(lat2 - lat1);  
//     const dLon = toRadians(lon2 - lon1);  
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));  
//     return R * c;  
// };

// const findNearbyMechanics = async (req, res) => {
//     const { latitude, longitude } = req.body;

//     try {
//         const mechanics = await Mechanic.find();  
//         const nearbyMechanics = mechanics
//             .map(mechanic => {
//                 const distance = calculateDistance(latitude, longitude, mechanic.latitude, mechanic.longitude);  
//                 return { ...mechanic._doc, distance };  
//             })
//             .sort((a, b) => a.distance - b.distance); 

//         res.status(200).json(nearbyMechanics);
//     } catch (error) {
//         console.error('Error finding nearby mechanics:', error);
//         res.status(500).json({ message: 'Failed to find nearby mechanics' });
//     }
// };

// const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
//         const updatedOrder = await MechOrder.findByIdAndUpdate(orderId, { status }, { new: true });

//         if (!updatedOrder) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Emit the status update event
//         if (io) {
//             io.emit('orderStatusChanged', updatedOrder);
//         }

//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({ message: 'Error updating order status', error });
//     }
// };

// module.exports = { 
//     createUserForm, 
//     setSocketIOInstance, 
//     getUserForms, 
//     findNearbyMechanics,
//     updateOrderStatus // Add this to the exports
// };






















// const UserForm = require('../Models/Userform.model');
// const Mechanic = require('../Models/Mechanics.model');

// let io; 

// const setSocketIOInstance = (socketIOInstance) => {
//     io = socketIOInstance;
// };

// const createUserForm = async (req, res) => {
//     try {
//         const form = new UserForm(req.body);  
//         const savedForm = await form.save();  

//         if (io) {
//             io.emit('newUserForm', savedForm); 
//         }

//         res.status(201).json({ message: 'Form created successfully', form: savedForm });
//     } catch (error) {
//         console.error('Error creating user form:', error);
//         res.status(500).json({ message: 'Failed to create form' });
//     }
// };

// const getUserForms = async (req, res) => {
//     try {
//         const forms = await UserForm.find();  
//         res.status(200).json(forms);
//     } catch (error) {
//         console.error('Error fetching user forms:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;  
//     const toRadians = angle => angle * Math.PI / 180;  
//     const dLat = toRadians(lat2 - lat1);  
//     const dLon = toRadians(lon2 - lon1);  
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));  
//     return R * c;  
// };

// const findNearbyMechanics = async (req, res) => {
//     const { latitude, longitude } = req.body;

//     try {
//         const mechanics = await Mechanic.find();  
//         const nearbyMechanics = mechanics
//             .map(mechanic => {
//                 const distance = calculateDistance(latitude, longitude, mechanic.latitude, mechanic.longitude);  
//                 return { ...mechanic._doc, distance };  
//             })
//             .sort((a, b) => a.distance - b.distance); 

//         res.status(200).json(nearbyMechanics);
//     } catch (error) {
//         console.error('Error finding nearby mechanics:', error);
//         res.status(500).json({ message: 'Failed to find nearby mechanics' });
//     }
// };

// module.exports = { 
//     createUserForm, 
//     setSocketIOInstance, 
//     getUserForms, 
//     findNearbyMechanics 
// };





















const UserForm = require('../Models/Userform.model');
const Mechanic = require('../Models/Mechanics.model');

let io;

const setSocketIOInstance = (socketIOInstance) => {
    io = socketIOInstance;
};

const createUserForm = async (req, res) => {
    try {
        const form = new UserForm(req.body);
        const savedForm = await form.save();

        if (io) {
            io.emit('newUserForm', savedForm);
        }

        res.status(201).json({ message: 'Form created successfully', form: savedForm });
    } catch (error) {
        console.error('Error creating user form:', error);
        res.status(500).json({ message: 'Failed to create form' });
    }
};

const getUserForms = async (req, res) => {
    try {
        const forms = await UserForm.find();
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching user forms:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const toRadians = angle => angle * Math.PI / 180; 
    const dLat = toRadians(lat2 - lat1); 
    const dLon = toRadians(lon2 - lon1); 
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};

const findNearbyMechanics = async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const mechanics = await Mechanic.find();
        const nearbyMechanics = mechanics
            .map(mechanic => {
                const distance = calculateDistance(latitude, longitude, mechanic.latitude, mechanic.longitude);
                return { ...mechanic._doc, distance }; 
            })
            .sort((a, b) => a.distance - b.distance); 

        res.status(200).json(nearbyMechanics);
    } catch (error) {
        console.error('Error finding nearby mechanics:', error);
        res.status(500).json({ message: 'Failed to find nearby mechanics' });
    }
};

module.exports = { createUserForm, setSocketIOInstance, getUserForms, findNearbyMechanics };




















