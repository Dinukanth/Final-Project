const express = require('express');
const router = express.Router();
const MechOrder = require('../Models/Order.model')
const User = require('../Models/User.model')

const  {createUser, updateUser, deleteUser, getUser, getUserById}=  require('../Controllers/UserController');

// const {loginUser, signupUser } = require('../Controllers/authentication')
// const { hashGenerate } = require('../Helpers/hashing');
// Routes using controller functions
router.get('/get',getUser);
router.get('/get/:id', getUserById)
router.post('/create',createUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);



router.post('/notify', async (req, res) => {
    const { orderId, message } = req.body;

    try {
      // Here you can handle the notification logic, for example, sending a notification to a user
      // For simplicity, let's assume you are updating a user document in the database with the message
  
      // Example logic to update user document with the notification message
      const user = await User.findOneAndUpdate(
        { orderId }, // Assuming orderId uniquely identifies a user
        { notification: message }, // Update notification field in user document
        { new: true } // To return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Optionally, you can respond with a success message or updated user data
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

// router.post('/login',loginUser)
// router.post('/signup',signupUser)
module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const userController = require('../Controllers/UserController');
// const { hashGenerate, hashValidator } = require('../Helpers/hashing');
// const User = require('../Models/User.model');

// // Routes using controller functions
// router.get('/', userController.getUser);
// router.post('/signup', async (req, res) => {
//     const hashPassword = await hashGenerate(req.body.password);
//     const user = new User({
//         Name: req.body.Name,
//         Email: req.body.Email,
//         Password: hashPassword
//     });
//     const savedUser = await user.save();
//     res.send(savedUser);
// });
// router.post('/signin', async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ email: req.body.email })

//         if (!existingUser) {
//             res.send("Email is invalid")
//         }
//         else {
//             const checkUser = await hashValidator(req.body.password, existingUser.password)

//             if (!checkUser) {
//                 res.send("Password is Invalid")
//             }
//             res.send("Login Successful")
//         }
//     } catch (error) {
//         res.send(error)
//     }
// });

// router.put('/update/:id', userController.updateUser);
// router.delete('/delete/:id', userController.deleteUser);

// module.exports = router;


















// const express = require('express');
// const router = express.Router();
// const userController = require('../Controllers/UserController');
// const { hashGenerate } = require('../Helpers/hashing');
// const { hashValidator } = require("../Helpers/hashing")
// const User = require('../Models/User.model');

// // Routes using controller functions
// router.get('/', userController.getUser);
// router.post('/create', userController.createUser);

// router.post('/signup', async (req, res) => {

//     try {

//         const hashPassword = await hashGenerate(req.body.password);
//         const user = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashPassword
//         });
//         const savedUser = await user.save();
//         res.send(savedUser);
//     }
//     catch (err) {
//         res.send(err)
//     }
// });

// authRouts.post('/signin', async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ email: req.body.email })
//         if (!existingUser) {
//             res.send("Email is invalid")
//         }
//         else {
//             const checkUser = await hashValidator(req.body.password, existingUser.password)

//             if (!checkUser) {
//                 res.send("Password is Invalid")
//             }
//             res.send("Login Successful")
//         }
//     } catch (error) {
//         res.send(error)
//     }
// })



// router.put('/update/:id', userController.updateUser);
// router.delete('/delete/:id', userController.deleteUser);

// module.exports = router;
















// router.post('/signin', async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ email: req.body.email })

//         if (!existingUser) {
//             res.send("Email is invalid")
//         }
//         else {
//             const checkUser = await hashValidator(req.body.password, existingUser.password)

//             if (!checkUser) {
//                 res.send("Password is Invalid")
//             }
//             res.send("Login Successful")
//         }
//     } catch (error) {
//         res.send(error)
//     }
// });
