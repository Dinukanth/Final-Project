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




const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, getUser, getMechanicById, hireMechanic } = require('../Controllers/mechanicController');

// Routes using controller functions
router.get('/get', getUser); // Route to get all mechanics
router.get('/get/:id', getMechanicById); // Route to get mechanic by ID
router.post('/create', createUser);
router.post('/hire', hireMechanic);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;

