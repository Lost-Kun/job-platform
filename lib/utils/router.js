
const fs = require('fs');
const path = require('path');

// add url-route in /controllers:

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function readAllFile(dirPath, fileArr) {
    let fpath = dirPath;
    if(fs.existsSync(fpath)){
        let stats = fs.statSync(fpath);
        if(stats.isDirectory()){
            let files = fs.readdirSync(fpath);
            files.forEach(function(fileName){
                let fileOrDirPath = path.join(fpath, fileName);
                if(fileOrDirPath.endsWith('.js')){
                    fileArr.push(fileOrDirPath);
                }else{
                    readAllFile(fileOrDirPath, fileArr);
                }
            })
        }
    }
}

function addControllers(router, dir) {
  const fileArr = [];
  readAllFile(path.join(__dirname, dir), fileArr);
  fileArr.forEach((f) => {
    console.log(`process controller: ${f}...`);
    let mapping = require(f);
    addMapping(router, mapping);
  });
}

module.exports = function (dir) {
  let
    controllers_dir = dir || '../controllers',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
