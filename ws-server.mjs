import { WebSocketServer } from 'ws';

function errorHandler(err) {
    console.error(err);
}

export function createWebsocket(server) {
    const wss = new WebSocketServer({noServer: true});

    server.on('upgrade', function(req, socket, header) {
        // no validation yet
        socket.on('error', errorHandler);
        
        if (req.url === '/index-ws') {
            wss.handleUpgrade(req, socket, header, function(ws) {
                wss.emit('connection', ws, req);
            });
        }
    });

    wss.on('connection', function(ws, req) {
        console.log("Client connected.")

        ws.on('err', errorHandler);

        ws.on('message', function(_data) {
            const data = JSON.parse(_data);
            if (data.type === "chat_send_message") {
                const msg = data.content;
                console.log("Received message: " + msg);
            }
        });

        ws.on('close', function() {
            console.log("Client left.")
        })
    })
}