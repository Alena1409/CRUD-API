import http from 'node:http';
import dotenv from 'dotenv';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './services/user.service.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (req.url === '/api/users' && req.method === 'GET') {
    const users = getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (url?.startsWith('/api/users/') && method === 'GET') {
    const id = url.split('/')[3];
    const user = getUserById(id);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else if (req.url === '/api/users' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { username, age, hobbies } = data;

        const newUser = createUser(username, age, hobbies);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request body' }));
      }
    });
  } else if (url?.startsWith('/api/users/') && method === 'PUT') {
    const id = url.split('/')[3];
    let body = '';

    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const updated = updateUser(id, data);

        if (updated) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updated));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'User not found' }));
        }
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
  } else if (url?.startsWith('/api/users/') && method === 'DELETE') {
    
    const id = url.split('/')[3];
    const ok = deleteUser(id);

    if (ok) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}/`);
});

createUser('Alice', 25, ['reading', 'coding']);
