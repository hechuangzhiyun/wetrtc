const express = require('express')
const app = express()

app.listen(3000)

app.use(express.static('public'))

const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8080
});

wss.on('listening', () => {
    console.log('listening');
})

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        ws.send(message)
    });
});

