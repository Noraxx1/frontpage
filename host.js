const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const config = require('./config.json');

const getIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
        for (let iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            } else {
                return config.ip
            }
        }
    }
};

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? './index.html' : `.${req.url}`;
    const extname = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
    }[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading the file');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
});

const port = config.port || 3000;
const ip = getIPAddress();

server.listen(port, ip, () => {
    if (port !== 80) {console.log(`Server running at http://${ip}:${port}/`);} else {console.log(`Server running at http://${ip}`)}
});
