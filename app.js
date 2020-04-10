let fs = require('fs');
class App {
  constructor() {
    this.paths = []
  }
  get(path,callback) {
    this.paths.push(["GET",path,callback]);
  }
  post(path,callback) {
    this.paths.push(["POST",path,callback]);
  }
  file(name) {
    return (n)=>String(fs.readFileSync(name));
  }
}

module.exports = App;
