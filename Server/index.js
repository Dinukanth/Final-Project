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



