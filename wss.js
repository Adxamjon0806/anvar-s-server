import { WebSocketServer } from "ws";
import { v4 } from "uuid";

const clients = new Map();

export function SetupWebsocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);

        if (data.role === "client" && data.authenfication === false) {
          const uniqueId = v4();
          ws.id = uniqueId;
          clients.set(ws.id, ws);
          data.authenfication = true;
          ws.send(JSON.stringify({ ...data, uniqueId, registered: true }));
        }

        if (data.role === "helper") {
          console.log("Client registered as helper.");
          // helperSocket = ws;
        }
        if (data.html) {
          wss.clients.forEach(function each(client) {
            // if (
            //   client === helperSocket &&
            //   client.readyState === WebSocket.OPEN
            // ) {
            //   client.send(JSON.stringify(data));
            // }
          });
        }
      } catch (e) {
        console.error("Error parsing message", e.message);
      }
    });
    ws.on("close", (message) => {
      const id = JSON.parse(message);
      console.log(clients);
      clients.delete(id);
      console.log(`Connection is closed: with id: ${id}`);
      console.log(clients);
    });
  });
}
