const os = require('os');

const http = require('http');
const server = http.createServer((request, response) => {
  if(request.url === '/host') {
    const data = {
      os: os.type() + ' ' + os.arch(),
      usuario: os.userInfo().username,
      host: os.hostname(),
      ip: getIPAddress()
    }
    response.setHeader('Content-type', 'application/json');
    response.end(JSON.stringify(data));
  }
});
server.listen(3000);



const getIPAddress = (() => {
  const interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
      return alias.address;
    }
  }
  
  return '0.0.0.0';
});

console.log('Server INFO em funcionamento!');
console.log('os:', os.type(), os.arch());
console.log('usuario:', os.userInfo().username);
console.log('host:', os.hostname());
console.log ('ip:', getIPAddress());




