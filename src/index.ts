import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from CRUD API!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:4000/`);
});
