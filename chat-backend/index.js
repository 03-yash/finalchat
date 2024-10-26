const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/DBconfig");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config();
const path = require("path");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from your frontend
  },
});

let activeUsers = [];

// Socket.IO connection setup
io.on("connection", (socket) => {
  console.log("A user connected");

  // Add new user
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected users", activeUsers);
    // Emit connected users to all clients
    io.emit("get-users", activeUsers);
  });

  // Send message
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to receiver id");
    console.log(data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  // User disconnects
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
  });
});

// Express middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/user/chat", require("./routes/chatRoute"));
app.use("/api/user/message", require("./routes/msgRoute"));

// --------------Deployment------------


const __dirname1 = path.resolve(); // This will resolve the current directory of the running script

if (process.env.NODE_ENV === 'production') {
    // Correctly point to the dist directory
    const staticPath = path.join(__dirname1, '..', 'chat-frontend', 'dist');
    app.use(express.static(staticPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'), (err) => {
            if (err) {
                console.error('Error serving index.html:', err);
                res.status(err.status).end();
            }
        });
    });
} else {
    app.get("/", (req, res) => {
        res.json({
            msg: "Welcome to the chat app",
        });
    });
}


// --------------Deployment------------

// Error handler middleware
app.use(errorHandler);

// Database connection
connectDB();

// Start the server and Socket.IO
const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
