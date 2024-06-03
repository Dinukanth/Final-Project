const Mechanic = require('../Models/Mechanics.model');
const bcrypt = require('bcrypt');
const { hashGenerate } = require('../Helpers/hashing');

const getUser = (req, res) => {
    Mechanic.find({})
        .then(mechanics => {
            res.status(200).json(mechanics);
        })
        .catch(err => {
            console.error('Error fetching mechanics:', err);
            res.status(500).json({ message: 'Something went wrong' });
        });
};

const getMechanicById = async (req, res) => {
    try {
        const mechanicId = req.params.id;

        if (!mechanicId) {
            return res.status(400).json({ message: 'Mechanic ID is required' });
        }

        const mechanic = await Mechanic.findById(mechanicId);

        if (!mechanic) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }

        res.status(200).json(mechanic);
    } catch (error) {
        console.error('Error fetching mechanic:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const createUser = (req, res) => {
    const { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation } = req.body;

    if (!Name || !Email || !Password || !WhatkindofMechanic || !Phonenumber || !Address || !GarageLocation) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Received data:', req.body); 

    const user = new Mechanic({
        Name,
        Email,
        Password: bcrypt.hashSync(Password, 10),  
        WhatkindofMechanic,
        Phonenumber,
        Address,
        latitude: GarageLocation[0],
        longitude: GarageLocation[1]
    });

    user.save()
        .then(() => res.status(201).json({ message: 'Mechanic created successfully' }))
        .catch(err => {
            console.error('Error saving mechanic:', err);
            res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
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
            user.Password = bcrypt.hashSync(req.body.Password, 10);
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
        console.error('Error deleting mechanic:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const hireMechanic = async (req, res) => {
    const { mechanicId, userId, userLatitude, userLongitude } = req.body;

    try {
        const mechanic = await Mechanic.findById(mechanicId);
        if (!mechanic) {
            return res.status(404).json({ message: 'Mechanic not found' });
        }

        res.status(200).json({ message: 'Mechanic hired successfully', mechanic });
    } catch (error) {
        console.error('Error hiring mechanic:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = { getUser, createUser, updateUser, deleteUser, getMechanicById, hireMechanic };















