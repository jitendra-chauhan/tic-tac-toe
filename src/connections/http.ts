import express from "express";
import http from "http";
const app = express();

const server = http.createServer(app);

app.get("/test", (req: any, res: any) => {
  res.status(200).send("ok");
});

export = server;
