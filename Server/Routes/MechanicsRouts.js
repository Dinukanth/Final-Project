const express = require('express');
const router = express.Router();
const Mechanic = require('../Models/Mechanics.model'); // Import the Mechanic model
const { auth } = require('../Controllers/authenticationController');
const { 
    getUser, 
    getMechanicById, 
    createUser, 
    updateUser, 
    deleteUser,
    getOrderDetails, 
    hireUser, 
    updateOrderStatus, 
    getOrdersByMechanicId, 
    getAllOrders
} = require('../Controllers/mechanicController');

// Ensure that the imported functions are not undefined
if (!getUser || !getMechanicById || !createUser || !updateUser || !deleteUser || !hireUser || !updateOrderStatus || !getOrdersByMechanicId) {
    throw new Error('One or more route handler functions are not defined. Check the imports in mechanicRoutes.js');
}

// Route to get the logged-in mechanic's details
router.get('/getmech', auth, async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.user.userId);
        if (!mechanic) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }
        res.status(200).json(mechanic);
    } catch (error) {
        console.error("Error fetching mechanic details:", error);
        res.status(500).json({ message: 'Error fetching mechanic details' });
    }
});

router.get('/get', getUser);

router.get('/get/:id', getMechanicById);

router.post('/create', createUser);

router.post('/hire', hireUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

router.put('/order/status', updateOrderStatus);

// Fetch specific order by order ID
router.get('/order/:orderId', getOrderDetails);

// Fetch all orders for a specific mechanic by mechanic ID
router.get('/orders/mechanic/:mechanicId', auth, getOrdersByMechanicId);

router.get('/getAllOrders', getAllOrders);

module.exports = router;















// const express = require('express');
// const router = express.Router();
// const Mechanic = require('../Models/Mechanics.model'); // Import the Mechanic model
// const { auth } = require('../Controllers/authenticationController');
// const { 
//     getUser, 
//     getMechanicById, 
//     createUser, 
//     updateUser, 
//     deleteUser,
//     getOrderDetails, 
//     hireUser, 
//     updateOrderStatus, 
//     getOrdersByMechanicId, 
//     getAllOrders
// } = require('../Controllers/mechanicController');

// // Ensure that the imported functions are not undefined
// if (!getUser || !getMechanicById || !createUser || !updateUser || !deleteUser || !hireUser || !updateOrderStatus || !getOrdersByMechanicId) {
//     throw new Error('One or more route handler functions are not defined. Check the imports in mechanicRoutes.js');
// }

// // Route to get the logged-in mechanic's details
// router.get('/getmech', auth, async (req, res) => {
//     try {
//         const mechanic = await Mechanic.findById(req.user.userId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error("Error fetching mechanic details:", error);
//         res.status(500).json({ message: 'Error fetching mechanic details' });
//     }
// });

// router.get('/get', getUser);

// router.get('/get/:id', getMechanicById);

// router.post('/create', createUser);

// router.post('/hire', hireUser);

// router.put('/update/:id', updateUser);

// router.delete('/delete/:id', deleteUser);


// router.put('/order/status', updateOrderStatus);

// router.get('/orders/:orderId', getOrdersByMechanicId);
// router.get('/orders/details', getOrderDetails)
// router.get('/getAllOrders', getAllOrders)

// module.exports = router;

























// const express = require('express');
// const router = express.Router();
// const { createUser, updateUser, deleteUser, getUser, getMechanicById } = require('../Controllers/mechanicController');

// // const {loginUser, signupUser } = require('../Controllers/authentication')


// // Routes using controller functions
// router.get('/get', getUser);
// router.get('get/:id', getMechanicById)
// router.post('/create', createUser);
// router.put('/update/:id', updateUser);
// router.delete('/delete/:id', deleteUser);
// // app.get('/getmech/:id', getMechanicById)
// // router.post('/login', loginUser);
// // router.post('/signup', signupUser);

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const { createUser, updateUser, deleteUser, getUser, getMechanicById, hireMechanic } = require('../Controllers/mechanicController');


// router.get('/get', getUser); // Route to get all mechanics
// router.get('/get/:id', getMechanicById); // Route to get mechanic by ID
// router.post('/create', createUser);
// router.post('/hire', hireMechanic);
// router.put('/update/:id', updateUser);
// router.delete('/delete/:id', deleteUser);

// router.get('/details/:id', getMechanicById);

// module.exports = router;








// const express = require('express');
// const router = express.Router();
// const Mechanic = require('../Models/Mechanics.model'); 
// const { auth } = require('../Controllers/authenticationController');
// const { getUser, getMechanicById, createUser, updateUser, deleteUser, hireMechanic } = require('../Controllers/mechanicController');

// router.get('/getmech', auth, async (req, res) => {
//     try {
//         const mechanic = await Mechanic.findById(req.user.userId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error("Error fetching mechanic details:", error);
//         res.status(500).json({ message: 'Error fetching mechanic details' });
//     }
// });
// router.get('/get', getUser);

// router.get('/get/:id', getMechanicById);
// router.post('/create', createUser);
// router.post('/hire', hireMechanic);
// router.put('/update/:id', updateUser);
// router.delete('/delete/:id', deleteUser);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Mechanic = require('../Models/Mechanics.model'); // Import the Mechanic model
// const { auth } = require('../Controllers/authenticationController');
// const { getUser, getMechanicById, createUser, updateUser, deleteUser, hireuser } = require('../Controllers/mechanicController');

// // Ensure that the imported functions are not undefined
// if (!getUser || !getMechanicById || !createUser || !updateUser || !deleteUser || !hireuser) {
//     throw new Error('One or more route handler functions are not defined. Check the imports in MechanicsRouts.js');
// }

// // Define the routes with their respective handler functions
// router.get('/getmech', auth, async (req, res) => {
//     try {
//         const mechanic = await Mechanic.findById(req.user.userId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error("Error fetching mechanic details:", error);
//         res.status(500).json({ message: 'Error fetching mechanic details' });
//     }
// });

// router.get('/get', getUser);

// router.get('/get/:id', getMechanicById);
// router.post('/create', createUser);
// router.post('/hire', hireuser); // Ensure hireMechanic is correctly imported
// router.put('/update/:id', updateUser);
// router.delete('/delete/:id', deleteUser);

// module.exports = router;



















// const express = require('express');
// const router = express.Router();
// const Mechanic = require('../Models/Mechanics.model'); // Import the Mechanic model
// const { auth } = require('../Controllers/authenticationController');
// const { getUser, getMechanicById, createUser, updateUser, deleteUser, hireUser, updateOrderStatus, getOrdersByMechanicId } = require('../Controllers/mechanicController');

// // Ensure that the imported functions are not undefined
// if (!getUser || !getMechanicById || !createUser || !updateUser || !deleteUser || !hireUser || !updateOrderStatus || !getOrdersByMechanicId) {
//     throw new Error('One or more route handler functions are not defined. Check the imports in MechanicsRouts.js');
// }

// // Define the routes with their respective handler functions
// router.get('/getmech', auth, async (req, res) => {
//     try {
//         const mechanic = await Mechanic.findById(req.user.userId);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json(mechanic);
//     } catch (error) {
//         console.error("Error fetching mechanic details:", error);
//         res.status(500).json({ message: 'Error fetching mechanic details' });
//     }
// });

// router.get('/get', getUser);

// router.get('/get/:id', getMechanicById);
// router.post('/create', createUser);
// router.post('/hire', hireUser); // Ensure hireUser is correctly imported
// router.put('/update/:id', updateUser);
// router.delete('/delete/:id', deleteUser);

// // New routes for order management
// router.put('/order/status', updateOrderStatus); // New route for updating order status
// router.get('/orders/mechanic/:mechanicId', getOrdersByMechanicId); // New route for fetching orders by mechanic

// module.exports = router;


