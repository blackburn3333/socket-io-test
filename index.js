/**
 * Created by Jayendra Matarage on 7/1/2022.
 */
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const {Server} = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(bodyParser.raw()); // support encoded bodies

app.post('/send-to', (req, res) => {
    const {id, content} = req.body;
    const emitted = io.emit(id, content);
    let code = emitted ? 200 : 500;
    let msg = emitted ? "Successfully emitted" : "Error while emitting";
    return res.send({
        code: code,
        msg: msg
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('listening on *:3000');
});
