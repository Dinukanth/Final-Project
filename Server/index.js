const express = require('express');
const connectDB = require('./DB/Connect');
const userRoutes = require('./Routes/UserRouts');
const mechRoutes = require('./Routes/MechanicsRouts');
const loginRouts = require('./Routes/loginRouts');
const formRouts = require('./Routes/userFormRouts');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { setSocketIOInstance } = require('./Controllers/userFormController');

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes after middleware setup
app.use('/user', userRoutes);
app.use('/mech', mechRoutes);
app.use('/api', loginRouts);
app.use('/form', formRouts);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://gear-grease.vercel.app/",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    // console.log('a user connected');
    
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

setSocketIOInstance(io);

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();


















// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');
// const loginRouts = require('./Routes/loginRouts');
// const formRouts = require('./Routes/userFormRouts');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const { setSocketIOInstance } = require('./Controllers/userFormController');

// const app = express();
// const PORT = 3004;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define routes after middleware setup
// app.use('/user', userRoutes);
// app.use('/mech', mechRoutes); // Ensure this path is correct
// app.use('/api', loginRouts);
// app.use('/form', formRouts);

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     // console.log('a user connected');
    
//     socket.on('disconnect', () => {
//         // console.log('user disconnected');
//     });
// });

// setSocketIOInstance(io);

// const startServer = async () => {
//     try {
//         await connectDB();
//         server.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();






// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');
// const loginRouts = require('./Routes/loginRouts');
// const formRouts = require('./Routes/userFormRouts');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const { setSocketIOInstance } = require('./Controllers/userFormController');

// const app = express();
// const PORT = 3004;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define routes after middleware setup
// app.use('/user', userRoutes);
// app.use('/mech', mechRoutes); // Ensure this path is correct
// app.use('/api', loginRouts);
// app.use('/form', formRouts);

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     // console.log('a user connected');
    
//     socket.on('disconnect', () => {
//         // console.log('user disconnected');
//     });
// });

// setSocketIOInstance(io);

// const startServer = async () => {
//     try {
//         await connectDB();
//         server.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();












// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');
// const loginRouts = require('./Routes/loginRouts');
// const formRouts = require('./Routes/userFormRouts');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const { setSocketIOInstance } = require('./Controllers/userFormController');

// const app = express();
// const PORT = 3004;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define routes after middleware setup
// app.use('/user', userRoutes);
// app.use('/mech', mechRoutes);
// app.use('/api', loginRouts);
// app.use('/form', formRouts);

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     // console.log('a user connected');
    
//     socket.on('disconnect', () => {
//         // console.log('user disconnected');
//     });
// });

// setSocketIOInstance(io);

// const startServer = async () => {
//     try {
//         await connectDB();
//         server.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();



















// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');
// const loginRouts = require('./Routes/loginRouts');
// const formRouts = require('./Routes/userFormRouts');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const { setSocketIOInstance } = require('./Controllers/userFormController');

// const app = express();
// const PORT = 3004;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define routes after middleware setup
// app.use('/user', userRoutes);
// app.use('/mech', mechRoutes);
// app.use('/api', loginRouts);
// app.use('/form', formRouts);

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });
// console.log();

// io.on('connection', (socket) => {
//     // console.log('a user connected');
// });

// setSocketIOInstance(io);

// const startServer = async () => {
//     try {
//         await connectDB();
//         server.listen(PORT, () => {
//             console.log(`Server is running on the port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();











// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');
// const loginRouts = require('./Routes/loginRouts');
// const formRouts = require('./Routes/userFormRouts');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const PORT = 3004;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define routes after middleware setup
// app.use('/user', userRoutes);
// app.use('/mech', mechRoutes);
// app.use('/api', loginRouts);
// app.use('/form', formRouts);

// // Socket.IO connection
// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// // Export io for use in controllers
// module.exports = { io };

// const startServer = async () => {
//     try {
//         await connectDB();
//         server.listen(PORT, () => {
//             console.log(`Server is running on the port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();














// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');
// const loginRouts = require('./Routes/loginRouts')
// const formRouts = require('./Routes/userFormRouts')
// const cors = require('cors');

// const app = express();
// const PORT = 3004;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define routes after middleware setup
// app.use('/user', userRoutes);
// app.use('/mech', mechRoutes);

// app.use('/api', loginRouts)
// app.use('/form', formRouts)

// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server is running on the port ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// startServer();


















// const express = require('express');
// const connectDB = require('./DB/Connect');
// const userRoutes = require('./Routes/UserRouts');
// const mechRoutes = require('./Routes/MechanicsRouts');


// const bodyParser = require('body-parser');



// const cors = require('cors');

// const app = express();
// const PORT = 3004;
// app.use(cors());
// app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// // app.post('/User', (req, res) => {
// //     const{Name, Email, Password} = req.body
// //     Usermodel.findOne({Email: Email})
// //     .then(user => {
// //         if(user) {
// //             res.json("Already have an account")
// //         }
// //         else{

// //             Usermodel.create({Name: Name, Email: Email, Password: Password})
// //             .then(result => res.json ("Account created"))
// //             .catch(err => res.json("Error"))

// //         }
// //     }).catch(err => res.json(err))
// // })


// const startServer = async () => {
//     try{
//          connectDB();
//         app.listen(PORT, ()=>{
//             console.log(`Server is running on the port ${PORT}`)
//         })
//         app.use(express.json());
//         app.use('/users', userRoutes)
//         app.use('/mech', mechRoutes)

        
        
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// startServer();








// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const userRoutes = require('./Routes/UserRouts')
// const mechanicRoutes = require('./Routes/MechanicsRouts'); // Adjust the path as needed

// const app = express();
// const port = 3004;

// // Middleware for parsing JSON and URL-encoded data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/user', userRoutes);
// app.use('/mech', mechanicRoutes);

// mongoose.connect(envurl, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });







