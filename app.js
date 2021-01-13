const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')

app.listen(3000)

app.use(express.static('docs'))

const WebSocket = require('ws');


const server = https.createServer({
    cert: fs.readFileSync('./cert/cert1.pem'),
    key: fs.readFileSync('./cert/privkey1.pem')
});
const wss = new WebSocket.Server({server});

server.listen(8080);

// const wss = new WebSocket.Server({
//     port: 8080
// })

wss.on('listening', () => {
    console.log('listening');
})

let vistors = []
let blobs = []

wss.on('connection', function connection(ws, req) {
    if (req.url === '/vistors') {
        vistors.push(ws)
        setInterval(function () {
            if (blobs.length !== 0) {
                ws.send(blobs.shift())
            }
        }, 30)
    }
    ws.on('message', function incoming(message) {
        blobs.push(message)
    });
});
