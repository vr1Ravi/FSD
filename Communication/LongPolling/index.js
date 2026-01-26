import { log } from "console";
import express, { response } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

let version = 0
const waitingClients = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/api/v1/getData", (req, res) => {
    const clientVersion = req.query.lastVersion;
   
    
    //assuming lsatVersion is awaly numeric string    
    if(version !== JSON.parse(clientVersion)){
        res.json({version})
    }else{
        waitingClients.push(res)
    }
})

app.get("/api/v1/updateData", (req, res) => {
    const updatedVersion = req.query.updatedVersion;
    version = JSON.parse(updatedVersion)
    while(waitingClients.length){
        const waitingClient = waitingClients.pop();
        waitingClient.json({
            version
        })
    }
    res.json({
        success: true
    })
})


const port = 5001
app.listen(port, () => {
    console.log("Server running on port", port)
})