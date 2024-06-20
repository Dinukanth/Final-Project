const mongoose = require('mongoose');

const MechOrderSchema = new mongoose.Schema({
    mechanicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    serviceDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserForm'
    },
    userformId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserForm'
    },
    userLatitude: {
        type: Number,
        required: true
    },
    userLongitude: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

MechOrderSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'mechanicId',
        select: 'Name'
    })
    .populate({
        path: 'userId',
        select: 'Name'
    })
    .populate({
        path: 'serviceDetails',
        select: 'VehicleIssue'
    })
    .populate({
        path: 'userformId',
        select: 'Name' // Populate the Name field from the UserForm model
    });
    next();
});

const Order = mongoose.model('MechOrder', MechOrderSchema);
module.exports = Order;



















// const mongoose = require('mongoose');

// const MechOrderSchema = new mongoose.Schema({
//     mechanicId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Mechanic',
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     serviceDetails: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'UserForm'
//     },
//     userformId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'UserForm'
//     },
//     userLatitude: {
//         type: Number,
//         required: true
//     },
//     userLongitude: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'In Progress', 'Completed'],
//         default: 'Pending'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// MechOrderSchema.pre(/^find/, function(next){
//     this.populate({
//         path: "mechanicId",
//         select: "Name"
//     })
//     this.populate({
//         path: "userId",
//         select: "Name"
//     })
//     this.populate({
//         path: "serviceDetails",
//         select: "VehicleIssue"
//     })
//     next()
// })

// const Order = mongoose.model('MechOrder', MechOrderSchema);
// module.exports = Order