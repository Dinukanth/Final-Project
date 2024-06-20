const express = require('express');
const router = express.Router();
const Mechanic = require('../Models/Mechanics.model');
const MechOrder = require('../Models/Order.model');
const User = require('../Models/User.model');
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
    getAllOrders,
    getResponse,
    getOrderStatus,
    getOrderById
} = require('../Controllers/mechanicController');

// Ensure that the imported functions are not undefined
if (!getUser || !getMechanicById || !createUser || !updateUser || !deleteUser || !hireUser || !updateOrderStatus || !getOrdersByMechanicId || !getOrderById) {
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
router.get('/status/:orderId', getOrderStatus);

router.get('/orders/mechanic/:mechanicId', getOrdersByMechanicId);
router.get('/orders', getAllOrders);
router.get('/getResponse', getResponse)
router.get('/order/:id', getOrderById);




module.exports = router;
