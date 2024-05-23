const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, getUser,  } = require('../Controllers/mechanicController');

// const {loginUser, signupUser } = require('../Controllers/authentication')


// Routes using controller functions
router.get('/get', getUser);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
// router.post('/login', loginUser);
// router.post('/signup', signupUser);

module.exports = router;
