// const express = require("express");
// const connectDB = require("./config/DBconfig");
// const { errorHandler } = require("./middlewares/errorMiddleware");
// require("dotenv").config();

// const app = express();

// const PORT = process.env.PORT || 5555;

// // Database connection
// connectDB();

// // Middleware configuration
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Routes
// app.get("/", (req, res) => {
//   res.json({
//     msg: "Welcome to chat app",
//   });
// });

// app.use("/api/user", require("./routes/userRoute"));
// app.use("/api/user/chat", require("./routes/chatRoute"));
// app.use("/api/user/message", require("./routes/msgRoute"));

// // error handler
// app.use(errorHandler);

// // Server listening
// const server = app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`);
// });

const express = require("express");
const http = require("http"); // Required to create an HTTP server
const { Server } = require("socket.io"); // Import Socket.IO
const connectDB = require("./config/DBconfig");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config();

const app = express();

// Create an HTTP server with Express
const server = http.createServer(app); // Express server is used to create an HTTP server

// Initialize Socket.IO on the same server
const io = new Server(server, {
  cors: {
    origin: "https://finalchat-eight.vercel.app", // Allow requests from your frontend
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
    io.emit("get-users", activeUsers); // Emit connected users to all clients
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
app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the chat app",
  });
});

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/user/chat", require("./routes/chatRoute"));
app.use("/api/user/message", require("./routes/msgRoute"));

// Error handler middleware
app.use(errorHandler);

// Database connection
connectDB();

// Start the server and Socket.IO
const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
