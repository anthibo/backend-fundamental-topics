const http = require('http');
const WebSocketServer = require('websocket').server

// save a list of connected clients
let connections = [];

const httpServer = http.createServer()

const ws = new WebSocketServer({"httpServer": httpServer})

httpServer.listen(8080, () => console.log('server running on port 8080'))

ws.on("request", request => {
    const connection = request.accept(null, request.origin)

    // broadcast a message to all connections
    connection.on("message", message => {
        connections.forEach(c => c.send(`User ${connection.socket.remotePort} says: ${message.utf8Data}`))
    })
    
    connections.push(connection)

    // push a new connection notification to all connections
    connections.forEach(c => c.send(`User ${connection.socket.remotePort} has connected`))

})