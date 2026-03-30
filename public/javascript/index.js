const wsUri = `ws://${location.host}/index-ws`;
const websocket = new WebSocket(wsUri);

function sendMessage() {
    const message = document.getElementById("message").value;
    const data = JSON.stringify({
        type: "chat_send_message",
        content: message
    });

    websocket.send(data);
}