const express = require('express');
const router = express.Router();
const Mechanic = require('../Models/Mechanics.model')

const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => x * Math.PI / 180;

    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;

    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;

    const R = 6371; // km

    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d;
};

router.post('/findNearbyMechanics', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const mechanics = await Mechanic.find();
        const nearbyMechanics = mechanics.map(mechanic => ({
            mechanic,
            distance: haversineDistance(
                { latitude, longitude },
                { latitude: mechanic.latitude, longitude: mechanic.longitude }
            )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Get top 5 closest mechanics

        res.status(200).json(nearbyMechanics);
    } catch (error) {
        console.error('Error finding nearby mechanics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
