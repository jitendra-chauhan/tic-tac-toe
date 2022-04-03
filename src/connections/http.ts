import express from "express";
import http from "http";
const app = express();

const server = http.createServer(app);

app.use(express.static('view'));
app.use(express.static('script'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.get("/test", (req: any, res: any) => {
  res.status(200).send("ok");
});

export = server;
