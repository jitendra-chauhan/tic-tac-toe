import express from "express";
import http from "http";
const app = express();

const server = http.createServer(app);

app.use(express.static('view'));
app.use(express.static('model'));

app.get('/',function(req,res){
  console.log('__dirname ::: ',__dirname);
  const dir = __dirname.split('\dist');
  console.log('__dir ::: ',dir);

  // res.sendFile(dir[0]+'views/index.html');
  res.sendFile('index.html');
});

app.get("/test", (req: any, res: any) => {
  res.status(200).send("ok");
});

export = server;
