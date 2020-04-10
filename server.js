let http = require('http');
let url = require('url');
let bodyparser = require('./bodyparser');
let App = require('./app.js');
let app = new App();


let server_code = (req,res) => {
    let head=({"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"});
    let body='';
    let req_url = url.parse(req.url,true);
    req.on('data',(d)=>{
      body+=d;
    });
    req.on('end',()=>{
      let done = false;
      for(let i of app.paths) {
        if(req.method == i[0]) {
          if(req_url.pathname == i[1]) {
            let stuff=i[2](bodyparser(body));
            if(i[3]) {
              head['Content-Type'] = i[3];
            } else {
            if(typeof(stuff)=='object') {
              stuff = JSON.stringify(stuff);
              head['Content-Type'] = 'application/json'
            } else {
              //head['Content-Type'] = 'text/html'
            }
            }
            res.writeHead(200,head);
            res.write(stuff.toString()||stuff);
            done=true;
          }
        }
      }
      if(!done) {
      res.writeHead(200,head);
      res.write('<h1>404 Error</h1>');
      }
      res.end();
    });
  };

function startServer(port) {
  http.createServer(server_code).listen(port);
}

//startServer(3000);
module.exports = {
  start: startServer,
  app: app,
  code: server_code
};
