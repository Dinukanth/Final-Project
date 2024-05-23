const Mechanic = require('../Models/Mechanics.model');
const bcrypt = require('bcrypt');
const { hashGenerate } = require('../Helpers/hashing');

const getUser = (req, res) => {
    Mechanic.find({})
        .then(mechanics => {
            res.status(200).json(mechanics);
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong' });
        });
};

const createUser = (req, res) => {
    const user = new Mechanic({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        WhatkindofMechanic: req.body.WhatkindofMechanic,
        Phonenumber: req.body.Phonenumber,
        Address: req.body.Address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    user.save()
        .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
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
            user.Password = req.body.Password;
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
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getUser, createUser, updateUser, deleteUser };













// const Mechanic = require('../Models/Mechanics.model');
// const bcrypt = require('bcrypt');
// const { hashGenerate } = require('../Helpers/hashing');

// // const getUser = (req, res) => {
// //     Mechanic.find({})
// //         .then(users => {
// //             res.status(200).json(users);
// //         })
// //         .catch(err => {
// //             res.status(500).json({ message: 'Something went wrong' });
// //         });
// // };

// const getUser = (req, res) => {
//     Mechanic.find({})
//         .then(mechanics => {
//             res.status(200).json(mechanics);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// const createUser = (req, res) => {
//     const user = new Mechanic(req.body);
//     user.save()
//         .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
//         .catch(err => res.status(500).json({ message: 'Something went wrong' }));
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
//             user.Password = req.body.Password;
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
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };


// module.exports = { getUser, createUser, updateUser, deleteUser  };


// const signupUser = async (req, res) => {
//     try {
//         const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address } = req.body;
//         const hashPassword = await hashGenerate(Password);
        
//         const newMechanic = new Mechanic({
//             Name,
//             Email,
//             Password: hashPassword,
//             WhatkindofMechanic,
//             Phonenumber,
//             Address
//         });

//         await newMechanic.save();
//         return res.status(201).json({ message: 'Mechanic created successfully' });
//     } catch (error) {
//         console.error('Error creating mechanic:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const loginUser = async (req, res) => {
//     try {
//         const { Email, Password } = req.body;
//         const mechanic = await Mechanic.findOne({ Email });

//         if (!mechanic) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isPasswordValid = await bcrypt.compare(Password, mechanic.Password);
//         if (isPasswordValid) {
//             return res.status(200).json({ message: "Login successful", role: "mechanic" });
//         } else {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.error('Error logging in mechanic:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };


// signupUser, loginUser

































// const Mechanic = require('../Models/Mechanics.model');
// const bcrypt = require('bcrypt');
// const { hashValidator, hashGenerate } = require('../Helpers/hashing');
// const { loginUser, signupUser } = require('./UserController');

// exports.getUser = (req, res) => {
//     Mechanic.find({})
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// exports.createUser = (req, res) => {
//     const user = new Mechanic(req.body);
//     user.save()
//         .then(() => res.status(201).json({ message: 'User created successfully' }))
//         .catch(err => res.status(500).json({ message: 'Something went wrong' }));
// };

// exports.updateUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await Mechanic.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (req.body.Name) {
//             user.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             user.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             user.Password = req.body.Password;
//         }

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await Mechanic.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const loginUser = async (req, res) => {
//     try {
//         const { Email, Password } = req.body;
//         const mechanic = await Mechanic.findOne({ Email });

//         if (!mechanic) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isPasswordValid = await bcrypt.compare(Password, mechanic.Password);
//         if (isPasswordValid) {
//             return res.status(200).json({ message: "Login successful", role: "mechanic" });
//         } else {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.error('Error logging in mechanic:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// const signupUser = async (req, res) => {
//     try {
//         const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address } = req.body;
//         const hashPassword = await hashGenerate(Password);
        
//         const newMechanic = new Mechanic({
//             Name,
//             Email,
//             Password: hashPassword,
//             WhatkindofMechanic,
//             Phonenumber,
//             Address
//         });

//         await newMechanic.save();
//         return res.status(201).json({ message: 'Mechanic created successfully' });
//     } catch (error) {
//         console.error('Error creating mechanic:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };





// exports.signupUser = async (req, res) => {
//     try {
//         const hashPassword = await hashGenerate(req.body.Password);
//         const user = new Mechanic({
//             Name: req.body.Name,
//             Email: req.body.Email,
//             Password: hashPassword,
//             WhatkindofMechanic: req.body.WhatkindofMechanic,
//             Phonenumber: req.body.Phonenumber,
//             Address: req.body.Address
//         });

//         await user.save();
//         return res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };


// // use

// exports.loginUser = async (req, res) => {
//     try {
//         const existingUser = await Mechanic.findOne({ Email: req.body.Email });
        
//         if (!existingUser) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
//         else {  
//         const isPasswordValid = await bcrypt.compare(req.body.Password, existingUser.Password);


//            if (!isPasswordValid) {
//               return res.status(400).json({ message: "Password is invalid" });
//             }
//             else{

//                 res.status(200).json({ message: "Login successfull" });


//             }


//         }
        
        
       
        
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };




























// module.exports = {
//     getUser,
//     createUser,
//     updateUser,
//     deleteUser,
//     loginUser,
//     signupUser
// };







// exports.loginUser = async (req, res) => {
//     try {
//         const existingUser = await Mechanic.findOne({ Email: req.body.Email });

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













// // const express = require('express');
// // const mongoose = require('mongoose');
// const Mechanic = require('../Models/Mechanics.model');
// const bcrypt = require('bcrypt');
// const { hashValidator } = require('../Helpers/hashing');

// const {hashGenerate} = require('../Helpers/hashing')



// exports.getUser = (req, res) => {
//     // Logic to get all users
//     Mechanic.find({})
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };


// exports.createUser = (req, res) => {
//     const user = new Mechanic(req.body);
//     user.save().then(() => res.status(201).json({ message: 'User created successfully' })).catch(err => res.status(500).json({ message: 'Something went wrong' }));
// };


// exports.updateUser = async (req, res) => {
//     // Extract user ID from request parameters
//     const userId = req.params.id;

//     try {
//         // Find the user by ID
//         const user = await Mechanic.findById(userId);
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

// exports.deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const user = await Mechanic.findOneAndDelete({ _id: id });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// exports.signupUser = async (req, res) => {
//     try {
//         const hashPassword = await hashGenerate(req.body.Password);
//         const user = new Mechanic({
//             // UserId: req.body.UserId,
//             // Name: req.body.Name,
//             // Email: req.body.Email,
//             // Password: hashPassword

//             Name: req.body.Name,
//             Email: req.body.Email,
//             Password: hashPassword,
//             WhatkindofMechanic: req.body.WhatkindofMechanic,
//             Phonenumber: req.body.Phonenumber,
//             Address: req.body.Address
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
        
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Password is invalid" });
//         }
        
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// module.exports = loginUser;









// exports.loginUser = async (req, res) => {
//     try {
//         const existingUser = await Mechanic.findOne({ Email: req.body.Email });
        
//         if (!existingUser) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
//         else {  
//         const isPasswordValid = await bcrypt.compare(req.body.Password, existingUser.Password);


//            if (!isPasswordValid) {
//               return res.status(400).json({ message: "Password is invalid" });
//             }
//             else{

//                 res.status(200).json({ message: "Login successfull" });


//             }


//         }
        
        
       
        
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

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
// const Mechanic = require('../Models/Mechanics.model');
// const bcrypt = require('bcrypt');
// const { hashValidator } = require('../Helpers/hashing');
// const {hashGenerate} = require('../Helpers/hashing')








// Define your controller functions

// const getMechanic = (req, res) => {
//     // Logic to get all users
//     Mechanic.find({})
//         .then(mechanics => {
//             res.status(200).json(mechanics);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

// const createMechanic = (req, res) => {
//     const mechanic = new Mechanic(req.body);
//     mechanic.save().then(() => res.status(201).json({ message: 'Mechanic created successfully' })).catch(err => res.status(500).json({ message: 'Something went wrong' }));
// };

// const updateMechanic = async (req, res) => {
//     // Extract user ID from request parameters
//     const MechanicID = req.params.id;

//     try {
//         // Find the user by ID
//         const mechanic = await Mechanic.findById(MechanicID);
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }

//         // Update user properties
//         if (req.body.Name) {
//             mechanic.Name = req.body.Name;
//         }
//         if (req.body.Email) {
//             mechanic.Email = req.body.Email;
//         }
//         if (req.body.Password) {
//             mechanic.Password = req.body.Password;
//         }

//         // Save the updated user
//         const updatedMechanic = await mechanic.save();
//         res.status(200).json(updatedMechanic);
//     } catch (error) {
//         console.error('Error updating mechanic:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteMechanic = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const mechanic = await Mechanic.findOneAndDelete({ _id: id });
//         if (!mechanic) {
//             return res.status(404).json({ message: 'Mechanic not found' });
//         }
//         res.status(200).json({ message: 'Mechchanic deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };


// const signupMechanic = async (req, res) => {
//     try {
//         const hashPassword = await hashGenerate(req.body.Password);
//         const mechanic = new Mechanic({
//             MechanicID: req.body.MechanicID,
//             Name: req.body.Name,
//             Email: req.body.Email,
//             Password: hashPassword,
//             WhatkindofMechanic: req.body.WhatkindofMechanic,
//             Phonenumber: req.body.Phonenumber,
//             Address: req.body.Address
//         });

// // Save the user to the database
//         await mechanic.save();
//         // Send success response
//         return res.status(201).json({ message: 'mechanic created successfully' });
//     } catch (error) {
//         // Log the error for debugging
//         console.error('Error creating mechanic:', error);
//         // Send error response
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const loginMechanic = async (req, res) => {
//     try {
//         const existingMechanic = await Mechanic.findOne({ Email: req.body.Email });
        
//         if (!existingMechanic) {
//             return res.status(400).json({ message: "Email is invalid" });
//         }
        
//         const isPasswordValid = await bcrypt.compare(req.body.Password, existingMechanic.Password);
        
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Password is invalid" });
//         }
        
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         console.error('Error logging in mechanic:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// module.exports = {
//     getMechanic,
//     createMechanic,
//     deleteMechanic,
//     updateMechanic,
//     loginMechanic,
//     signupMechanic


// }






















// // const express = require('express')
// // const mongoose = require('mongoose')
// // const Mechanic = require('../Models/Mechanicsmodel')

// // const getUser = (req, res) => {
// //     User.find({})
// //         .then(users => {
// //             res.status(200).json(users);
// //         })
// //         .catch(err => {
// //             res.status(500).json({ message: 'Something went wrong' });
// //         });
// // };
// const express = require('express');
// const mongoose = require('mongoose');
// const User = require('../Models/User.model');
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

// const createUser = (req, res) => {
//     // Logic to create a user
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     user.save()
//     .then(() => {
//         res.status(201).json({ message: 'User created successfully' });
//     })
//     .catch(err => {
//         res.status(500).json({ message: 'Something went wrong' });
//     });
// };
// const updateUser = (req, res) => {
//     // Logic to update user
//     const id = req.params.id;
//     const { name, email, password } = req.body
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
// // Export your controller functions
