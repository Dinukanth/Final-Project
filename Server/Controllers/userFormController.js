const UserForm = require('../Models/Userform.model');

let io;

const setSocketIOInstance = (socketIOInstance) => {
    io = socketIOInstance;
};

const createUserForm = async (req, res) => {
    try {
        const form = new UserForm(req.body);
        const savedForm = await form.save();
        
        if (io) {
            io.emit('newUserForm', savedForm);
        }

        res.status(201).json({ message: 'Form created successfully', form: savedForm });
    } catch (error) {
        console.error('Error creating user form:', error);
        res.status(500).json({ message: 'Failed to create form' });
    }
};

const getUserForms = async (req, res) => {
    try {
        const forms = await UserForm.find();
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching user forms:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createUserForm, setSocketIOInstance, getUserForms };


















// const UserForm = require ('../Models/Userform.model')

// let io;

// const setSocketIOInstance = (socketIOInstance) => {
//     io = socketIOInstance;
// };

// const createUserForm = async (req, res) => {
//     try {
//         const form = new UserForm(req.body);
//         const savedForm = await form.save();
        
//         if (io) {
//             io.emit('newUserForm', savedForm);
//         }

//         res.status(201).json({ message: 'Form created successfully', form: savedForm });
//     } catch (error) {
//         console.error('Error creating user form:', error);
//         res.status(500).json({ message: 'Failed to create form' });
//     }
// };

// const getUserForms = async (req, res) => {
//     try {
//         const forms = await UserForm.find();
//         res.status(200).json(forms);
//     } catch (error) {
//         console.error('Error fetching user forms:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// module.exports = { createUserForm, setSocketIOInstance, getUserForms };











// const Userform = require('../Models/Userform.model')

// let io;
// const setSocketIOInstance = (socketIOInstance) => {
//     io = socketIOInstance;
// };

// const createUserForm = async (req, res) => {
//     try {
//         const form = new Userform(req.body);
//         const savedForm = await form.save();
        
//         if (io) {
//             io.emit('newUserForm', savedForm);
//         }

//         res.status(201).json({ message: 'Form created successfully', form: savedForm });
//     } catch (error) {
//         console.error('Error creating user form:', error);
//         res.status(500).json({ message: 'Failed to create form' });
//     }
// };

// const getUserForms = async (req, res) => {
//     try {
//         const forms = await UserForm.find();
//         res.status(200).json(forms);
//     } catch (error) {
//         console.error('Error fetching user forms:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };


// module.exports = { createUserForm, setSocketIOInstance, getUserForms };





// // controllers/userForm.controller.js
// const UserForm = require('../Models/Userform.model');
// const io = require('../index').io; // assuming you export io from index.js

// const createUserForm = (req, res) => {
//     const userForm = new UserForm(req.body);
//     userForm.save()
//         .then(() => {
//             res.status(201).json({ message: 'User form created successfully' });
//             io.emit('newUserForm', userForm);
//         })
//         .catch(err => {
//             console.error('Error creating user form:', err);
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };


// const getUserForms = (req, res) => {
//     UserForm.find({})
//         .then(userForms => {
//             res.status(200).json(userForms);
//         })
//         .catch(err => {
//             console.error('Error fetching user forms:', err);
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };



// // const createUserForm = (req, res) => {
// //     const userForm = new UserForm(req.body);
// //     userForm.save()
// //         .then(() => res.status(201).json({ message: 'User form created successfully' }))
// //         .catch(err => {
// //             console.error('Error creating user form:', err);
// //             res.status(500).json({ message: 'Something went wrong' });
// //         });
// // };

// const updateUserForm = async (req, res) => {
//     const formId = req.params.id;
//     try {
//         const userForm = await UserForm.findById(formId);
//         if (!userForm) {
//             return res.status(404).json({ message: 'User form not found' });
//         }

//         Object.keys(req.body).forEach(key => {
//             userForm[key] = req.body[key];
//         });

//         const updatedForm = await userForm.save();
//         res.status(200).json(updatedForm);
//     } catch (error) {
//         console.error('Error updating user form:', error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteUserForm = async (req, res) => {
//     const formId = req.params.id;
//     try {
//         const userForm = await UserForm.findOneAndDelete({ _id: formId });
//         if (!userForm) {
//             return res.status(404).json({ message: 'User form not found' });
//         }
//         res.status(200).json({ message: 'User form deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting user form:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// module.exports = { getUserForms, createUserForm, updateUserForm, deleteUserForm };
