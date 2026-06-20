const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const connectDB = require("./db/db");
const userroute = require("./routes/userRoutes");
const initSocket = require("./sockets/iosocketController");

const app = express();
app.use(express.json());

connectDB();

app.use(helmet());
app.use(cors());
app.use(hpp());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

initSocket(io);

app.use("/api/users", userroute);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});