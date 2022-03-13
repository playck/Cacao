const SocketIO = require("socket.io");

import { Application, NextFunction, RequestHandler } from "express";
import session from "express-session";
import { Session } from "inspector";
import { Server } from "net";
import { Socket } from "socket.io";

const socket = (Server, Application, RequestHandler) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
    },
  });

  app.set("io", io);

  const chat = io.of("/chat");

  io.use((Socket, NextFunction) => {
    const req = socket.request;

    const res = socket.request.res || {};

    session(req, res, next);
  });

  chat.on("connent", async (req, res) => {
    socket.on("join", (roomId) => {
      socket.join(roomId);
    });
  });

  socket.on("disconnent", (date) => {
    console.log("Disconnected to Chat");
  });
};

export default socket;
