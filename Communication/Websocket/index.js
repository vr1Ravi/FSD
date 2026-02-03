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
    IO.emit("chat-message", message);
  });
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 5001;
app.listen(port, () => {
  console.log("Server running on port", port);
});
