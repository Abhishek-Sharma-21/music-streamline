// test_api.js
const http = require('http');

const data = JSON.stringify({
  name: 'test',
  email: 'test@test.com',
  password: 'password123'
});

const req = http.request({
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', error => console.error('Error:', error.message));
req.write(data);
req.end();
