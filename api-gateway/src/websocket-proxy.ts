import WebSocket, { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { createProxy } from "http-proxy";

export class WebSocketProxy {
  private wss: WebSocketServer;
  private proxy = createProxy();

  constructor(server: any, options: { target: string }) {
    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (client: WebSocket, request: IncomingMessage) => {
      // Proxy to target WebSocket server
      this.proxy.ws(request, client as any, { target: options.target });
    });

    console.log("WebSocket proxy ready");
  }
}
