import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import { WebSocketProxy } from "./websocket-proxy";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// User Service (Spring Boot) - REST
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://user-service:8081", // Spring Boot container
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
  })
);

// Chat Service (Node.js) - GraphQL
app.use(
  "/graphql",
  createProxyMiddleware({
    target: "http://chat-service:4000", // GraphQL container
    changeOrigin: true,
  })
);

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

// WebSocket Proxy
new WebSocketProxy(server, {
  target: "ws://chat-service:8080", // WebSocket container
});
