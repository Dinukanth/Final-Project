const User = require('../Models/User.model');
const bcrypt = require('bcrypt');
const { hashGenerate } = require('../Helpers/hashing');

const getUser = (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong' });
        });
};

const createUser = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        const hashPassword = await hashGenerate(Password);
        
        const newUser = new User({
            Name,
            Email,
            Password: hashPassword
        });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.Name) {
            user.Name = req.body.Name;
        }
        if (req.body.Email) {
            user.Email = req.body.Email;
        }
        if (req.body.Password) {
            user.Password = req.body.Password;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
    
};


const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getUser, createUser, updateUser, deleteUser, getUserById };


































// const UserForm = require('../Models/Userform.model');
// const Mechanic = require('../Models/Mechanics.model');
// const MechOrder = require('../Models/Order.model');

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
//     updateOrderStatus
// };
