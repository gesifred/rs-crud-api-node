import * as dotenv from "dotenv";
import * as http from 'node:http';
import { URL } from 'url';
import 'dotenv/config';
//import Db from "./Db";
//import * as uuid from 'uuid';
import UsersRoute from "./routes/UsersRoute";

dotenv.config();

if (!process.env.PORT) {
  console.log('You need to provide a port in a .env file');
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

console.log(PORT);

function handleRoute(req, res):void {
  const myurl = new URL('http://' + req.headers.host + req.url);
  const path = myurl.pathname;
  if (path === '/api/users' && req.method === 'GET') {

    UsersRoute.getAllUsers(req, res);

  } else if (path === '/api/users' && req.method === 'POST') {

    UsersRoute.addUser(req, res);

  } else if (path.startsWith('/api/users/') && req.method === 'GET') {

    const id = path.substring('/api/users/'.length);
    UsersRoute.getUser(req, res, id);

  } else if (path.startsWith('/api/users/') && req.method === 'PUT') {

    const id = path.substring('/api/users/'.length);
    UsersRoute.updateUser(req,res,id);

  } else if (path.startsWith('/api/users/') && req.method === 'DELETE') {

    const id = path.substring('/api/users/'.length);
    UsersRoute.deleteUser(req, res, id);

  } else {

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');

  }
}

const server = http.createServer((req, res) => {
  handleRoute(req, res);
});

// start server on port PORT
server.listen(PORT, () => {
  console.log("listening on ", PORT)
});
