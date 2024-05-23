const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');
const Mechanic = require('../Models/Mechanics.model');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        
        // Try to find a user with the provided email
        const user = await User.findOne({ Email });
        // Try to find a mechanic with the provided email
        const mechanic = await Mechanic.findOne({ Email });

        // Check if either a user or a mechanic with the provided email exists
        if (!user && !mechanic) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // If a user with the provided email exists, check their password
        if (user) {
            const isPasswordValid = await bcrypt.compare(Password, user.Password);
            if (isPasswordValid) {
                // Generate JWT token
                const token = jwt.sign({ userId: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful", role: "user", token });
            }
        }

        // If a mechanic with the provided email exists, check their password
        if (mechanic) {
            const isPasswordValid = await bcrypt.compare(Password, mechanic.Password);
            if (isPasswordValid) {
                // Generate JWT token
                const token = jwt.sign({ userId: mechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful", role: "mechanic", token });
            }
        }

        // If the password is invalid for both user and mechanic, return an error
        return res.status(400).json({ message: "Invalid email or password" });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signupUser = async (req, res) => {
    try {
        const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address } = req.body;
        const existingUser = await User.findOne({ Email });
        const existingMechanic = await Mechanic.findOne({ Email });

        // Check if a user with the provided email already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Check if a mechanic with the provided email already exists
        if (existingMechanic) {
            return res.status(400).json({ message: "Mechanic already exists with this email" });
        }

        // Determine whether the signup request is for a user or a mechanic
        if (WhatkindofMechanic && Phonenumber && Address) {
            // Signup request is for a mechanic
            const hashPassword = await bcrypt.hash(Password, 10);
            const newMechanic = new Mechanic({
                Name,
                Email,
                Password: hashPassword,
                WhatkindofMechanic,
                Phonenumber,
                Address
            });
            await newMechanic.save();

            // Generate JWT token
            const token = jwt.sign({ userId: newMechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ message: 'Mechanic created successfully', token });
        } else {
            // Signup request is for a user
            const hashPassword = await bcrypt.hash(Password, 10);
            const newUser = new User({
                Name,
                Email,
                Password: hashPassword
            });
            await newUser.save();

            // Generate JWT token
            const token = jwt.sign({ userId: newUser._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ message: 'User signed up successfully', token });
        }
    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = { loginUser, signupUser, auth };




























// const jwt = require('jsonwebtoken');
// const User = require('../Models/User.model');
// const Mechanic = require('../Models/Mechanics.model')
// const bcrypt = require('bcrypt');

// const loginUser = async (req, res) => {
//     try {
//         const { Email, Password } = req.body;
        
//         // Try to find a user with the provided email
//         const user = await User.findOne({ Email });
//         // Try to find a mechanic with the provided email
//         const mechanic = await Mechanic.findOne({ Email });

//         // Check if either a user or a mechanic with the provided email exists
//         if (!user && !mechanic) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // If a user with the provided email exists, check their password
//         if (user) {
//             const isPasswordValid = await bcrypt.compare(Password, user.Password);
//             if (isPasswordValid) {
//                 // Generate JWT token
//                 const token = jwt.sign({ userId: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 return res.status(200).json({ message: "Login successful", role: "user", token });
//             }
//         }

//         // If a mechanic with the provided email exists, check their password
//         if (mechanic) {
//             const isPasswordValid = await bcrypt.compare(Password, mechanic.Password);
//             if (isPasswordValid) {
//                 // Generate JWT token
//                 const token = jwt.sign({ userId: mechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 return res.status(200).json({ message: "Login successful", role: "mechanic", token });
//             }
//         }

//         // If the password is invalid for both user and mechanic, return an error
//         return res.status(400).json({ message: "Invalid email or password" });
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// const signupUser = async (req, res) => {
//     try {
//         const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address } = req.body;
//         const existingUser = await User.findOne({ Email });
//         const existingMechanic = await Mechanic.findOne({ Email });

//         // Check if a user with the provided email already exists
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists with this email" });
//         }

//         // Check if a mechanic with the provided email already exists
//         if (existingMechanic) {
//             return res.status(400).json({ message: "Mechanic already exists with this email" });
//         }

//         // Determine whether the signup request is for a user or a mechanic
//         if (WhatkindofMechanic && Phonenumber && Address) {
//             // Signup request is for a mechanic
//             const hashPassword = await bcrypt.hash(Password, 10);
//             const newMechanic = new Mechanic({
//                 Name,
//                 Email,
//                 Password: hashPassword,
//                 WhatkindofMechanic,
//                 Phonenumber,
//                 Address
//             });
//             await newMechanic.save();

//             // Generate JWT token
//             const token = jwt.sign({ userId: newMechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return res.status(201).json({ message: 'Mechanic created successfully', token });
//         } else {
//             // Signup request is for a user
//             const hashPassword = await bcrypt.hash(Password, 10);
//             const newUser = new User({
//                 Name,
//                 Email,
//                 Password: hashPassword
//             });
//             await newUser.save();

//             // Generate JWT token
//             const token = jwt.sign({ userId: newUser._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return res.status(201).json({ message: 'User signed up successfully', token });
//         }
//     } catch (error) {
//         console.error('Error signing up:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }

    
// };

// const auth = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//     try {
//         const decoded = jwt.verify(token, 'your_jwt_secret'); // replace 'your_jwt_secret' with your actual secret
//         req.user = decoded;
//         next();
//     } catch (e) {
//         res.status(400).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = { loginUser, signupUser, auth };

















// const jwt = require('jsonwebtoken');
// const User = require('../Models/User.model');
// const Mechanic = require('../Models/Mechanics.model')
// const bcrypt = require('bcrypt');

// const loginUser = async (req, res) => {
//     try {
//         const { Email, Password } = req.body;
        
//         // Try to find a user with the provided email
//         const user = await User.findOne({ Email });
//         // Try to find a mechanic with the provided email
//         const mechanic = await Mechanic.findOne({ Email });

//         // Check if either a user or a mechanic with the provided email exists
//         if (!user && !mechanic) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // If a user with the provided email exists, check their password
//         if (user) {
//             const isPasswordValid = await bcrypt.compare(Password, user.Password);
//             if (isPasswordValid) {
//                 // Generate JWT token
//                 const token = jwt.sign({ userId: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 return res.status(200).json({ message: "Login successful", role: "user", token });
//             }
//         }

//         // If a mechanic with the provided email exists, check their password
//         if (mechanic) {
//             const isPasswordValid = await bcrypt.compare(Password, mechanic.Password);
//             if (isPasswordValid) {
//                 // Generate JWT token
//                 const token = jwt.sign({ userId: mechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 return res.status(200).json({ message: "Login successful", role: "mechanic", token });
//             }
//         }

//         // If the password is invalid for both user and mechanic, return an error
//         return res.status(400).json({ message: "Invalid email or password" });
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// const signupUser = async (req, res) => {
//     try {
//         const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address } = req.body;
//         const existingUser = await User.findOne({ Email });
//         const existingMechanic = await Mechanic.findOne({ Email });

//         // Check if a user with the provided email already exists
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists with this email" });
//         }

//         // Check if a mechanic with the provided email already exists
//         if (existingMechanic) {
//             return res.status(400).json({ message: "Mechanic already exists with this email" });
//         }

//         // Determine whether the signup request is for a user or a mechanic
//         if (WhatkindofMechanic && Phonenumber && Address) {
//             // Signup request is for a mechanic
//             const hashPassword = await bcrypt.hash(Password, 10);
//             const newMechanic = new Mechanic({
//                 Name,
//                 Email,
//                 Password: hashPassword,
//                 WhatkindofMechanic,
//                 Phonenumber,
//                 Address
//             });
//             await newMechanic.save();

//             // Generate JWT token
//             const token = jwt.sign({ userId: newMechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return res.status(201).json({ message: 'Mechanic created successfully', token });
//         } else {
//             // Signup request is for a user
//             const hashPassword = await bcrypt.hash(Password, 10);
//             const newUser = new User({
//                 Name,
//                 Email,
//                 Password: hashPassword
//             });
//             await newUser.save();

//             // Generate JWT token
//             const token = jwt.sign({ userId: newUser._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return res.status(201).json({ message: 'User signed up successfully', token });
//         }
//     } catch (error) {
//         console.error('Error signing up:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// module.exports = { signupUser };

// module.exports = { loginUser };





