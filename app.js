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
    return (n)=>fs.readFileSync(name).toString();
  }
  image(path,file) {
    this.paths.push(["GET",path,((n)=>fs.readFileSync(file).toString()),'image/jpg']);
  }
}

module.exports = App;
