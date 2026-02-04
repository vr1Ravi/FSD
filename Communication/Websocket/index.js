import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

// socket connection
const server = createServer(app);
const IO = new Server(server);

IO.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("chat-message", (message) => {
    console.log("Message received");
    IO.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 5001;
server.listen(port, () => {
  console.log("Server running on port", port);
});
