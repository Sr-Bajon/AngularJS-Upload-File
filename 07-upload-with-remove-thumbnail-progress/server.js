var express    = require('express'),
    formidable = require('formidable'),
    fs         = require('fs'),
    path       = require('path');

var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname +  '/index.html');
});

app.post('/upload', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // `file` is the name of the <input> field of type `file`
    var old_path  = files.file.path,
        file_size = files.file.size,
        file_ext  = files.file.name.split('.').pop(),
        index     = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_path  = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

    fs.readFile(old_path, function (err, data) {
      fs.writeFile(new_path, data, function (err) {
        fs.unlink(old_path, function (err) {
          if (err) {
            res.status(500);
            res.json({'success': false});
          } else {
            res.status(200);
            res.json({'success': true});
          }
        });
      });
    });
  });
});

app.listen(3000);
