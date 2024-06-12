const Mechanic = require('../Models/Mechanics.model');
const MechOrder = require('../Models/Order.model');
const User = require('../Models/User.model')
const bcrypt = require('bcrypt');
const { hashGenerate } = require('../Helpers/hashing');
const mongoose = require('mongoose')

const getUser = (req, res) => {
    Mechanic.find({})
        .then(mechanics => {
            res.status(200).json(mechanics);
        })
        .catch(err => {
            console.error('Error fetching mechanics:', err);
            res.status(500).json({ message: 'Something went wrong' });
        });
};

const getMechanicById = async (req, res) => {
    try {
        const mechanicId = req.params.id;

        if (!mechanicId) {
            return res.status(400).json({ message: 'Mechanic ID is required' });
        }

        const mechanic = await Mechanic.findById(mechanicId);

        if (!mechanic) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }

        res.status(200).json(mechanic);
    } catch (error) {
        console.error('Error fetching mechanic:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const createUser = (req, res) => {
    const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

    if (!Name || !Email || !Password || !WhatkindofMechanic || !Phonenumber || !Address || !GarageLocation) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Received data:', req.body); 

    const user = new Mechanic({
        Name,
        Email,
        Password: bcrypt.hashSync(Password, 10),  
        WhatkindofMechanic,
        Phonenumber,
        Address,
        latitude: GarageLocation[0],
        longitude: GarageLocation[1]
    });

    user.save()
        .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
        .catch(err => {
            console.error('Error saving mechanic:', err);
            res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Mechanic.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }

        if (req.body.Name) {
            user.Name = req.body.Name;
        }
        if (req.body.Email) {
            user.Email = req.body.Email;
        }
        if (req.body.Password) {
            user.Password = bcrypt.hashSync(req.body.Password, 10);
        }
        if (req.body.WhatkindofMechanic) {
            user.WhatkindofMechanic = req.body.WhatkindofMechanic;
        }
        if (req.body.Phonenumber) {
            user.Phonenumber = req.body.Phonenumber;
        }
        if (req.body.Address) {
            user.Address = req.body.Address;
        }
        if (req.body.latitude) {
            user.latitude = req.body.latitude;
        }
        if (req.body.longitude) {
            user.longitude = req.body.longitude;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating mechanic:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Mechanic.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }
        res.status(200).json({ message: 'Mechanic deleted successfully' });
    } catch (err) {
        console.error('Error deleting mechanic:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const hireUser = async (req, res) => {
    const { mechanicId, userId, serviceDetails, userLatitude, userLongitude } = req.body;

    try {
        const mechanic = await Mechanic.findById(mechanicId);
        if (!mechanic) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }

        const newOrder = new MechOrder({
            mechanicId,
            userId,
            serviceDetails,
            userLatitude,
            userLongitude,
            status: 'Pending',
            createdAt: new Date()
        });

        const savedOrder = await newOrder.save();

        res.status(200).json({ message: 'Mechanic hired successfully', order: savedOrder });
    } catch (error) {
        console.error('Error hiring mechanic:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const getUserOrders = async (req, res) =>{
    
}
const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        const order = await MechOrder.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};


const getOrdersByMechanicId = async (req, res) => {
    try {
        const mechanicId = req.user.userId;
        const orders = await MechOrder.find({ mechanicId });

        const detailedOrders = await Promise.all(orders.map(async order => {
            const user = await User.findById(order.userId);
            return {
                ...order._doc,
                userName: user ? user.Name : 'Unknown'
            };
        }));

        res.status(200).send(detailedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(400).send({ message: 'Error fetching orders', error });
    }
};


// const  getOrdersByMechanicId = async (req, res) => {
//     const { orderId } = req.params;

//     try {
//         const order = await MechOrder.findById(orderId)
//             .populate('mechanicId', 'name')
//             .populate('userId', 'name email')
//             .exec();

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.status(200).json(order);
//     } catch (error) {
//         console.error('Error fetching order:', error);
//         res.status(500).json({ message: 'Failed to fetch order', error: error.message });
//     }
// };

const getOrderDetails = async (req, res) => {
    try {
        const orders = await MechOrder.find()
            .populate('mechanicId', 'Name')
            .populate('userId', 'Name Email')
            .populate('serviceDetails', 'VehicleIssue');

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await MechOrder.find();

        const detailedOrders = await Promise.all(orders.map(async order => {
            const mechanic = await Mechanic.findById(order.mechanicId);
            const user = await User.findById(order.userId);
            return {
                ...order._doc,
                mechanicName: mechanic ? mechanic.Name : 'Unknown',
                userName: user ? user.Name : 'Unknown'
            };
        }));

        res.status(200).send(detailedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(400).send({ message: 'Error fetching orders', error });
    }
};





// const getAllOrders = async (req,res) => {
//     try{
//         const orders = await MechOrder.find();
//         res.status(200).send(orders)
//     } catch {
//         res.status(400).send(error)
//     }
// }


module.exports = { 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    getMechanicById, 
    hireUser, 
    updateOrderStatus,
    getOrdersByMechanicId,
    getOrderDetails,
    getAllOrders
};






















// const Mechanic = require('../Models/Mechanics.model');
// const UserForm = require('../Models/Userform.model'); // Ensure the UserForm model is imported
// const MechOrder = require('../Models/Order.model'); // Import the MechOrder model
// const bcrypt = require('bcrypt');
// const { hashGenerate } = require('../Helpers/hashing');

// const getUser = (req, res) => {
//     Mechanic.find({})
//         .then(mechanics => {
//             res.status(200).json(mechanics);
//         })
//         .catch(err => {
//             console.error('Error fetching mechanics:', err);
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// const getMechanicById = async (req, res) => {
//     try {
//         const mechanicId = req.params.id;

//         if (!mechanicId) {
//             return res.status(400).json({ message: 'Mechanic ID is required' });
//         }

//         const mechanic = await Mechanic.findById(mechanicId);

//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error('Error fetching mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const createUser = (req, res) => {
//     const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

//     if (!Name || !Email || !Password || !WhatkindofMechanic || !Phonenumber || !Address || !GarageLocation) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     console.log('Received data:', req.body); 

//     const user = new Mechanic({
//         Name,
//         Email,
//         Password: bcrypt.hashSync(Password, 10),  
//         WhatkindofMechanic,
//         Phonenumber,
//         Address,
//         latitude: GarageLocation[0],
//         longitude: GarageLocation[1]
//     });

//     user.save()
//         .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
//         .catch(err => {
//             console.error('Error saving mechanic:', err);
//             res.status(500).json({ message: 'Something went wrong', error: err.message });
//         });
// };

// const updateUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await Mechanic.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         if (req.body.Name) {
//             user.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             user.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             user.Password = bcrypt.hashSync(req.body.Password, 10);
//         }
//         if (req.body.WhatkindofMechanic) {
//             user.WhatkindofMechanic = req.body.WhatkindofMechanic;
//         }
//         if (req.body.Phonenumber) {
//             user.Phonenumber = req.body.Phonenumber;
//         }
//         if (req.body.Address) {
//             user.Address = req.body.Address;
//         }
//         if (req.body.latitude) {
//             user.latitude = req.body.latitude;
//         }
//         if (req.body.longitude) {
//             user.longitude = req.body.longitude;
//         }

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await Mechanic.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json({ message: 'Mechanic deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting mechanic:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };


// // const hireUser = async (req, res) => {
// //     const { mechanicId, userId, serviceDetails, userLatitude, userLongitude } = req.body;

// //     try {
// //         const mechanic = await Mechanic.findById(mechanicId);
// //         if (!mechanic) {
// //             return res.status(404).json({ message: 'Mechanic not found' });
// //         }

// //         const newOrder = new MechOrder({
// //             mechanicId,
// //             userId,
// //             serviceDetails,
// //             status: 'Pending',
// //             createdAt: new Date()
// //         });

// //         const savedOrder = await newOrder.save();

// //         res.status(200).json({ message: 'Mechanic hired successfully', order: savedOrder });
// //     } catch (error) {
// //         console.error('Error hiring mechanic:', error);
// //         res.status(500).json({ message: 'Something went wrong', error: error.message });
// //     }
// // };














// const hireUser = async (req, res) => {



//      const { mechanicId, userId, userLatitude, userLongitude } = req.body;

//     try {
//         const mechanic = await Mechanic.findById(mechanicId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         // Handle the hire logic here, for now, just returning success message
//         res.status(200).json({ message: 'Mechanic hired successfully', mechanic });
//     } catch (error) {
//         console.error('Error hiring mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
//     // const { mechanicId, userId, serviceDetails, userLatitude, userLongitude } = req.body;

//     // try {
//     //     const mechanic = await Mechanic.findById(mechanicId);
//     //     if (!mechanic) {
//     //         return res.status(404).json({ message: 'Mechanic not found' });
//     //     }

//     //     const newOrder = new MechOrder({
//     //         mechanicId,
//     //         userId,
//     //         serviceDetails,
//     //         status: 'Pending',
//     //         createdAt: new Date()
//     //     });

//     //     const savedOrder = await newOrder.save();

//     //     res.status(200).json({ message: 'Mechanic hired successfully', order: savedOrder });
//     // } catch (error) {
//     //     console.error('Error hiring mechanic:', error);
//     //     res.status(500).json({ message: 'Something went wrong', error: error.message });
//     // }
// };

// const updateOrderStatus = async (req, res) => {
//     const { orderId, status } = req.body;

//     try {
//         const order = await MechOrder.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         order.status = status;
//         const updatedOrder = await order.save();

//         res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// const getOrdersByMechanicId = async (req, res) => {
//     const { mechanicId } = req.params;

//     try {
//         const orders = await MechOrder.find({ mechanicId });
//         if (!orders) {
//             return res.status(404).json({ message: 'No orders found for this mechanic' });
//         }

//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// module.exports = { 
//     getUser, 
//     createUser, 
//     updateUser, 
//     deleteUser, 
//     getMechanicById, 
//     hireUser, 
//     updateOrderStatus,
//     getOrdersByMechanicId 
// };

























// const Mechanic = require('../Models/Mechanics.model');
// const UserForm = require('../Models/Userform.model'); // Ensure the UserForm model is imported
// const MechOrder = require('../Models/MechOrder.model'); // Import the MechOrder model
// const bcrypt = require('bcrypt');
// const { hashGenerate } = require('../Helpers/hashing');

// const getUser = (req, res) => {
//     Mechanic.find({})
//         .then(mechanics => {
//             res.status(200).json(mechanics);
//         })
//         .catch(err => {
//             console.error('Error fetching mechanics:', err);
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// const getMechanicById = async (req, res) => {
//     try {
//         const mechanicId = req.params.id;

//         if (!mechanicId) {
//             return res.status(400).json({ message: 'Mechanic ID is required' });
//         }

//         const mechanic = await Mechanic.findById(mechanicId);

//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error('Error fetching mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const createUser = (req, res) => {
//     const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

//     if (!Name || !Email || !Password || !WhatkindofMechanic || !Phonenumber || !Address || !GarageLocation) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     console.log('Received data:', req.body); 

//     const user = new Mechanic({
//         Name,
//         Email,
//         Password: bcrypt.hashSync(Password, 10),  
//         WhatkindofMechanic,
//         Phonenumber,
//         Address,
//         latitude: GarageLocation[0],
//         longitude: GarageLocation[1]
//     });

//     user.save()
//         .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
//         .catch(err => {
//             console.error('Error saving mechanic:', err);
//             res.status(500).json({ message: 'Something went wrong', error: err.message });
//         });
// };

// const updateUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await Mechanic.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         if (req.body.Name) {
//             user.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             user.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             user.Password = bcrypt.hashSync(req.body.Password, 10);
//         }
//         if (req.body.WhatkindofMechanic) {
//             user.WhatkindofMechanic = req.body.WhatkindofMechanic;
//         }
//         if (req.body.Phonenumber) {
//             user.Phonenumber = req.body.Phonenumber;
//         }
//         if (req.body.Address) {
//             user.Address = req.body.Address;
//         }
//         if (req.body.latitude) {
//             user.latitude = req.body.latitude;
//         }
//         if (req.body.longitude) {
//             user.longitude = req.body.longitude;
//         }

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await Mechanic.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json({ message: 'Mechanic deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting mechanic:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const hireUser = async (req, res) => {
//     const { mechanicId, userId, serviceDetails, userLatitude, userLongitude } = req.body;

//     try {
//         const mechanic = await Mechanic.findById(mechanicId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         const newOrder = new MechOrder({
//             mechanicId,
//             userId,
//             serviceDetails,
//             status: 'Pending',
//             createdAt: new Date()
//         });

//         const savedOrder = await newOrder.save();

//         res.status(200).json({ message: 'Mechanic hired successfully', order: savedOrder });
//     } catch (error) {
//         console.error('Error hiring mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// const updateOrderStatus = async (req, res) => {
//     const { orderId, status } = req.body;

//     try {
//         const order = await MechOrder.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         order.status = status;
//         const updatedOrder = await order.save();

//         res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// const getOrdersByMechanicId = async (req, res) => {
//     const { mechanicId } = req.params;

//     try {
//         const orders = await MechOrder.find({ mechanicId });
//         if (!orders) {
//             return res.status(404).json({ message: 'No orders found for this mechanic' });
//         }

//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// module.exports = { 
//     getUser, 
//     createUser, 
//     updateUser, 
//     deleteUser, 
//     getMechanicById, 
//     hireUser, 
//     updateOrderStatus,
//     getOrdersByMechanicId 
// };














// const Mechanic = require('../Models/Mechanics.model');
// const UserForm = require('../Models/Userform.model'); // Ensure the UserForm model is imported
// const bcrypt = require('bcrypt');
// const { hashGenerate } = require('../Helpers/hashing');

// const getUser = (req, res) => {
//     Mechanic.find({})
//         .then(mechanics => {
//             res.status(200).json(mechanics);
//         })
//         .catch(err => {
//             console.error('Error fetching mechanics:', err);
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// const getMechanicById = async (req, res) => {
//     try {
//         const mechanicId = req.params.id;

//         if (!mechanicId) {
//             return res.status(400).json({ message: 'Mechanic ID is required' });
//         }

//         const mechanic = await Mechanic.findById(mechanicId);

//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error('Error fetching mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const createUser = (req, res) => {
//     const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

//     if (!Name || !Email || !Password || !WhatkindofMechanic || !Phonenumber || !Address || !GarageLocation) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     console.log('Received data:', req.body); 

//     const user = new Mechanic({
//         Name,
//         Email,
//         Password: bcrypt.hashSync(Password, 10),  
//         WhatkindofMechanic,
//         Phonenumber,
//         Address,
//         latitude: GarageLocation[0],
//         longitude: GarageLocation[1]
//     });

//     user.save()
//         .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
//         .catch(err => {
//             console.error('Error saving mechanic:', err);
//             res.status(500).json({ message: 'Something went wrong', error: err.message });
//         });
// };

// const updateUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await Mechanic.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         if (req.body.Name) {
//             user.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             user.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             user.Password = bcrypt.hashSync(req.body.Password, 10);
//         }
//         if (req.body.WhatkindofMechanic) {
//             user.WhatkindofMechanic = req.body.WhatkindofMechanic;
//         }
//         if (req.body.Phonenumber) {
//             user.Phonenumber = req.body.Phonenumber;
//         }
//         if (req.body.Address) {
//             user.Address = req.body.Address;
//         }
//         if (req.body.latitude) {
//             user.latitude = req.body.latitude;
//         }
//         if (req.body.longitude) {
//             user.longitude = req.body.longitude;
//         }

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await Mechanic.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json({ message: 'Mechanic deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting mechanic:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const hireuser = async (req, res) => {
//     const { mechanicId, userId, userLatitude, userLongitude, userFormDetails } = req.body;

//     try {
//         const mechanic = await Mechanic.findById(mechanicId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         const userForm = new UserForm({
//             userId,
//             mechanicId,
//             userLatitude,
//             userLongitude,
//             ...userFormDetails // Assuming userFormDetails contains the fields of UserForm model
//         });

//         await userForm.save();

//         res.status(200).json({ message: 'Mechanic hired successfully', mechanic, userForm });
//     } catch (error) {
//         console.error('Error hiring mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// module.exports = { getUser, createUser, updateUser, deleteUser, getMechanicById, hireuser };




































// const Mechanic = require('../Models/Mechanics.model');
// const bcrypt = require('bcrypt');
// const { hashGenerate } = require('../Helpers/hashing');

// const getUser = (req, res) => {
//     Mechanic.find({})
//         .then(mechanics => {
//             res.status(200).json(mechanics);
//         })
//         .catch(err => {
//             console.error('Error fetching mechanics:', err);
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// const getMechanicById = async (req, res) => {
//     try {
//         const mechanicId = req.params.id;

//         if (!mechanicId) {
//             return res.status(400).json({ message: 'Mechanic ID is required' });
//         }

//         const mechanic = await Mechanic.findById(mechanicId);

//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error('Error fetching mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };




// const createUser = (req, res) => {
//     const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

//     if (!Name || !Email || !Password || !WhatkindofMechanic || !Phonenumber || !Address || !GarageLocation) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     console.log('Received data:', req.body); 

//     const user = new Mechanic({
//         Name,
//         Email,
//         Password: bcrypt.hashSync(Password, 10),  
//         WhatkindofMechanic,
//         Phonenumber,
//         Address,
//         latitude: GarageLocation[0],
//         longitude: GarageLocation[1]
//     });

//     user.save()
//         .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
//         .catch(err => {
//             console.error('Error saving mechanic:', err);
//             res.status(500).json({ message: 'Something went wrong', error: err.message });
//         });
// };

// const updateUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await Mechanic.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         if (req.body.Name) {
//             user.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             user.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             user.Password = bcrypt.hashSync(req.body.Password, 10);
//         }
//         if (req.body.WhatkindofMechanic) {
//             user.WhatkindofMechanic = req.body.WhatkindofMechanic;
//         }
//         if (req.body.Phonenumber) {
//             user.Phonenumber = req.body.Phonenumber;
//         }
//         if (req.body.Address) {
//             user.Address = req.body.Address;
//         }
//         if (req.body.latitude) {
//             user.latitude = req.body.latitude;
//         }
//         if (req.body.longitude) {
//             user.longitude = req.body.longitude;
//         }

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await Mechanic.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json({ message: 'Mechanic deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting mechanic:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };



// const hireuser = async (req, res) => {
//     const { mechanicId, userId, userLatitude, userLongitude, userFormDetails } = req.body;

//     try {
//         const mechanic = await Mechanic.findById(mechanicId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         const userForm = new UserForm({
//             userId,
//             mechanicId,
//             userLatitude,
//             userLongitude,
//             ...userFormDetails // Assuming userFormDetails contains the fields of UserForm model
//         });

//         await userForm.save();

//         res.status(200).json({ message: 'Mechanic hired successfully', mechanic, userForm });
//     } catch (error) {
//         console.error('Error hiring mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// }





// const hireMechanic = async (req, res) => {
//     const { mechanicId, userId, userLatitude, userLongitude } = req.body;

//     try {
//         const mechanic = await Mechanic.findById(mechanicId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         res.status(200).json({ message: 'Mechanic hired successfully', mechanic });
//     } catch (error) {
//         console.error('Error hiring mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

// module.exports = { getUser, createUser, updateUser, deleteUser, getMechanicById, hireuser };















