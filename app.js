var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs');
const GoogleImages = require('google-images');
const client = new GoogleImages('013523228459583098939:dcw2-mrqkug', 'AIzaSyAr4SqrX2SvIaU6MuMGZ20OgeHWi5g8Cns');
var app = http.createServer(function (req, res) {
  if (req.url.indexOf('/imgsearch') != -1) {

    client.search("mercedes", {searchType: "image", size: "large"})
      .then(images => {
        /*
        [{
            "url": "http://steveangello.com/boss.jpg",
            "type": "image/jpeg",
            "width": 1024,
            "height": 768,
            "size": 102451,
            "thumbnail": {
                "url": "http://steveangello.com/thumbnail.jpg",
                "width": 512,
                "height": 512
            }
        }]
        */
        if (images.length != undefined && images.length > 0) {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          var firstImg = images[0];
          res.write(JSON.stringify(firstImg));
        } else {
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          });
          res.write('No images found.');
        }
        res.end();
      }).catch((err) => {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('Connection timed out.');
        res.write(JSON.stringify(err));
        res.end();
      });

  } else if (req.url.indexOf('/img') != -1) {
    var filePath = req.url.split('/img')[1];
    fs.readFile(__dirname + '/public/img' + filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.write(data);
      }  
      res.end();
    });
  } else if (req.url.indexOf('/js') != -1) {
    var filePath = req.url.split('/js')[1];
    fs.readFile(__dirname + '/public/js' + filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
      }  
      res.end();
    });
  } else if(req.url.indexOf('/css') != -1) {
    var filePath = req.url.split('/css')[1];
    fs.readFile(__dirname + '/public/css' + filePath, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
      }
      res.end();
    });
  } else {
    fs.readFile(__dirname + '/public/index.html', function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404: Resource not found.');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
      }
      res.end();
    });
  }
}).listen(port, '0.0.0.0');

module.exports = app;