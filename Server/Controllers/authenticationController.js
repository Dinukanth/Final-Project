const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');
const Mechanic = require('../Models/Mechanics.model');
const bcrypt = require('bcrypt');






const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        
        const user = await User.findOne({ Email });
        const mechanic = await Mechanic.findOne({ Email });

        if (!user && !mechanic) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user) {
            const isPasswordValid = await bcrypt.compare(Password, user.Password);
            if (isPasswordValid) {
                const token = jwt.sign({ userId: user._id, role: "user", Name: user.Name }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful", role: "user", token, user });
            }
        }

        if (mechanic) {
            const isPasswordValid = await bcrypt.compare(Password, mechanic.Password);
            if (isPasswordValid) {
                const token = jwt.sign({ userId: mechanic._id, role: "mechanic" , Name: mechanic.Name}, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful", role: "mechanic", token, mechanic });
            }
        }

        return res.status(400).json({ message: "Invalid email or password" });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
};









// const signupUser = async (req, res) => {
//     try {
//         const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

//         console.log('Received payload:', req.body);

      
//         const existingUser = await User.findOne({ Email });
//         const existingMechanic = await Mechanic.findOne({ Email });

//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists with this email" });
//         }

//         if (existingMechanic) {
//             return res.status(400).json({ message: "Mechanic already exists with this email" });
//         }

//         const hashPassword = await bcrypt.hash(Password, 10);

//         if (WhatkindofMechanic) {
//             const newMechanic = new Mechanic({
//                 Name,
//                 Email,
//                 Password: hashPassword,
//                 WhatkindofMechanic,
//                 Phonenumber,
//                 Address,
//                 latitude: GarageLocation.latitude,
//                 longitude: GarageLocation.longitude
//             });

//             await newMechanic.save();
//             const token = jwt.sign({ userId: newMechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return res.status(201).json({ message: 'Mechanic created successfully', token });
//         } else {
//             const newUser = new User({
//                 Name,
//                 Email,
//                 Password: hashPassword
//             });

//             await newUser.save();
//             const token = jwt.sign({ userId: newUser._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return res.status(201).json({ message: 'User signed up successfully', token });
//         }
//     } catch (error) {
//         console.error('Error signing up:', error);
//         return res.status(500).json({ message: 'Something went wrong', error: error.message });
//     }
// };

const signupUser = async (req, res) => {
    try {
        const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

        console.log('Received payload:', req.body);

        // Check if the email contains any capital letters
        if (/[A-Z]/.test(Email)) {
            return res.status(400).json({ message: "Email must not contain capital letters" });
        }

        const existingUser = await User.findOne({ Email });
        const existingMechanic = await Mechanic.findOne({ Email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        if (existingMechanic) {
            return res.status(400).json({ message: "Mechanic already exists with this email" });
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        if (WhatkindofMechanic) {
            const newMechanic = new Mechanic({
                Name,
                Email,
                Password: hashPassword,
                WhatkindofMechanic,
                Phonenumber,
                Address,
                latitude: GarageLocation.latitude,
                longitude: GarageLocation.longitude
            });

            await newMechanic.save();
            const token = jwt.sign({ userId: newMechanic._id, role: "mechanic" }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ message: 'Mechanic created successfully', token });
        } else {
            const newUser = new User({
                Name,
                Email,
                Password: hashPassword
            });

            await newUser.save();
            const token = jwt.sign({ userId: newUser._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ message: 'User signed up successfully', token });
        }
    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
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




















