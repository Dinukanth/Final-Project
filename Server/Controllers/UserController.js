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

module.exports = { getUser, createUser, updateUser, deleteUser};


// const loginUser = async (req, res) => {
//     try {
//         const { Email, Password } = req.body;
//         const user = await User.findOne({ Email });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isPasswordValid = await bcrypt.compare(Password, user.Password);
//         if (isPasswordValid) {
//             return res.status(200).json({ message: "Login successful", role: "user" });
//         } else {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// const signupUser = async (req, res) => {
//     try {
//         const { Name, Email, Password } = req.body;
//         const existingUser = await User.findOne({ Email });

//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists with this email" });
//         }

//         const hashPassword = await hashGenerate(Password);
        
//         const newUser = new User({
//             Name,
//             Email,
//             Password: hashPassword
//         });

//         await newUser.save();
//         return res.status(201).json({ message: 'User signed up successfully' });
//     } catch (error) {
//         console.error('Error signing up user:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };





































// const express = require('express');
// const mongoose = require('mongoose');
// const User = require('../Models/User.model');
// const bcrypt = require('bcrypt');
// const { hashValidator } = require('../Helpers/hashing');
// const {hashGenerate} = require('../Helpers/hashing')

// // Define your controller functions

// const getUser = (req, res) => {
//     // Logic to get all users
//     User.find({})
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// // User.save().then(() => res.status(201).json({ message: 'User created successfully' })).catch(err => res.status(500).json({ message: 'Something went wrong' }));


// // const createUser = async (req, res) => { // Make the function asynchronous
// //     try {
// //         // const hashPassword = await hashGenerate(req.body.Password); // Wait for hashGenerate to finish
// //         // Logic to create a user
// //         const user = new User({
// //             UserId: req.body.UserId,
// //             Name: req.body.Name,
// //             Email: req.body.Email,
// //             Password: req.body.Password
// //         });
// //         await user.save(); 
// //         // Wait for user.save() to finish
// //         res.status(201).json({ message: 'User created successfully' });
// //     } catch (err) {
// //         res.status(500).json({ message: 'Something went wrong' });
// //     }
// // };
// const createUser = (req, res) => {
//     const user = new User(req.body);
//     user.save().then(() => res.status(201).json({ message: 'User created successfully' })).catch(err => res.status(500).json({ message: 'Something went wrong' }));
// };


// const updateUser = async (req, res) => {
//     // Extract user ID from request parameters
//     const userId = req.params.id;

//     try {
//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update user properties
//         if (req.body.Name) {
//             user.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             user.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             user.Password = req.body.Password;
//         }

//         // Save the updated user
//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };







// // const updateUser = (req, res) => {
// //     // Logic to update user
// //     const id = req.params.id;
// //     const { Name, Email, Password } = req.body
// // };

// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await User.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };







// const signupUser = async (req, res) => {
//     try {
//         const hashPassword = await hashGenerate(req.body.Password);
//         const user = new User({
//             // UserId: req.body.UserId,
//             Name: req.body.Name,
//             Email: req.body.Email,
//             Password: hashPassword

//         });

// // Save the user to the database
//         await user.save();
//         // Send success response
//         return res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         // Log the error for debugging
//         console.error('Error creating user:', error);
//         // Send error response
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };






// const loginUser = async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ Email: req.body.Email });
        
//         if (!existingUser) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
        
//         const isPasswordValid = await bcrypt.compare(req.body.Password, existingUser.Password);
        
//     if (!isPasswordValid) {
//             return res.status(400).json({ message: "Password is invalid" });
//         }
        
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };












// // Export your controller functions
// module.exports = {
//     getUser, 
//     createUser,
//     updateUser,
//     deleteUser,
//     signupUser,
//     loginUser
    

// };













// const express = require('express');
// const mongoose = require('mongoose');
// const User = require('../Models/User.model');

// const createUser = async (req, res) => {
//     try {
//         const user = new User({
//             Name: req.body.FirstName,
//             Email: req.body.Email,
//             Password: req.body.Password
//         });
//         await user.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// module.exports = {
//     createUser
// };



// const loginUser = async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ Email: req.body.Email });
//         if (!existingUser) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
//         const checkUser = await hashValidator(req.body.Password, existingUser.Password);
//         if (!checkUser) {
//             return res.status(400).json({ message: "Password is invalid" });
//         }
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };



// const loginUser = async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ Email: req.body.Email });
//         if (!existingUser) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
//         const checkUser = await hashValidator(req.body.Password, existingUser.Password);
//         if (!checkUser) {
//             return res.status(400).json({ message: "Password is invalid" });
//         }
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };






// const loginUser = async (req, res) => {
//     try {
//         const user = await User.findOne({ Email: req.body.Email }); // Find the user by email

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the password matches
//         if (user.Password !== req.body.Password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // If everything is correct, you can consider the user logged in
//         res.status(200).json({ message: 'Login successful' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };















// const signupUser = async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ Email: req.body.Email }); // Check if user already exists

//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const user = new User({
//             UserId: req.body.UserId,
//             Name: req.body.Name,
//             Email: req.body.Email,
//             Password: req.body.Password
//         });
//         await user.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };







///// login////////


// const loginUser = async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ Email: req.body.Email });
        
//         if (!existingUser) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
        
//         const isPasswordValid = await bcrypt.compare(req.body.Password, existingUser.Password);
        
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
        
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };



// const loginUser = async (req, res) => {
//     try {
//         const existingUser = await User.findOne({ Email: req.body.Email });
        
//         if (!existingUser) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
        
//         const isPasswordValid = await bcrypt.compare(req.body.Password, existingUser.Password);
        
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Password is invalid" });
//         }
        
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };




// const deleteUser = (req, res) => {
//     // Logic to delete user
//     const id = req.params.id;
//     User.findOneAndDelete({ _id: id }, (err, user) => {
//         if (err) {
//             res.status(500).json({ message: 'Something went wrong' });
//         } else if (!user) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.status(200).json({ message: 'User deleted successfully' });
//         }
//     });
// };





// const deleteUser = (req, res) => {
//     // Logic to delete user
//     const id = req.params.id;
//     User.findByIdAndRemove(id, (err, user) => {
//         if (err) {
//             res.status(500).json({ message: 'Something went wrong' });
//         } else if (!user) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.status(200).json(user);
//         }
//     });
// };



// const signupUser = async (req, res) => {
//     try {
//         const hashPassword = await hashGenerate(req.body.password);
//         const user = new User({
//             // UserId: req.body.UserId,
//             Name: req.body.Name,
//             Email: req.body.Email,
//             Password: hashPassword
//         });
//         await user.save(); 

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };