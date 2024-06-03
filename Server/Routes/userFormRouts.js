const express = require('express');
const { createUserForm, getUserForms, findNearbyMechanics,  } = require('../Controllers/userFormController');

const router = express.Router();

router.post('/createform', createUserForm);
router.get('/getforms', getUserForms);
router.post('/findnearbymechanics', findNearbyMechanics); 

module.exports = router;














// const express = require('express');
// const { createUserForm, getUserForms } = require('../Controllers/userFormController');

// const router = express.Router();

// // Define the route for creating a user form
// router.post('/createform', createUserForm);
// router.get('/getform', getUserForms);
// module.exports = router;
















// // routes/userForm.routes.js
// const express = require('express');
// const router = express.Router();
// const { getUserForms, createUserForm, updateUserForm, deleteUserForm } = require('../Controllers/userFormController')

// router.get('/forms', getUserForms);
// router.post('/forms', createUserForm);
// router.put('/forms/:id', updateUserForm);
// router.delete('/forms/:id', deleteUserForm);

// module.exports = router;
