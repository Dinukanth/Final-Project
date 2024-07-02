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


const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getUser, createUser, updateUser, deleteUser, getUserById };




















