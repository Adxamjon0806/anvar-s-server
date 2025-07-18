import { WebSocketServer } from "ws";

let helperSocket = null;

export function SetupWebsocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);

        if (data.role === "helper") {
          console.log("Client registered as helper.");
          helperSocket = ws;
        }
        if (data.html) {
          wss.clients.forEach(function each(client) {
            if (
              client === helperSocket &&
              client.readyState === WebSocket.OPEN
            ) {
              client.send(JSON.stringify(data));
            }
          });
        }
      } catch (e) {
        console.error("Error parsing message", e.message);
      }
    });
    ws.on("close", () => {
      console.log("Connection is closed");
    });
  });
}
