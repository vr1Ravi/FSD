import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

let initialData = "Version 0"
let data = 0

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/api/v1/getData", (req, res) => {
    res.send({
        version : data
    })
})

app.get("/api/v1/updateData", (req, res) => {
    initialData = "Version" + ++data;
})


const port = 5001
app.listen(port, () => {
    console.log("Server running on port", port)
})