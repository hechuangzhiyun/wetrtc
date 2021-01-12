const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')

app.listen(3000)

app.use(express.static('public'))

const WebSocket = require('ws');


const server = https.createServer({
  cert: fs.readFileSync('./cert/cert1.pem'),
  key: fs.readFileSync('./cert/privkey1.pem')
});
const wss = new WebSocket.Server({ server });

server.listen(8080);

wss.on('listening', () => {
    console.log('listening');
})

let connections = []

wss.on('connection', function connection(ws) {
    connections.push(ws)
    ws.on('message', function incoming(message) {
        connections.forEach((item)=>{
            item.send(message)
        })
    });
});
