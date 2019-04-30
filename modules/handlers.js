const fs = require('fs');
const formidable = require('formidable');
let lastFile;
exports.upload = function (request, response) {
    console.log('Rozpoczyniam obsługę żądania upload.');
    let form = new formidable.IncomingForm();
    form.parse(request, (error, fields, files) => {
        fs.renameSync(files.upload.path, files.upload.name);
        lastFile = files.upload.name;
        fs.readFile('templates/upload.html', (err, html) => {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write(html);
            response.end();
        });
    });
}

exports.show = function (request, response) {
    fs.readFile(lastFile, 'binary', (err, file) => {
        response.writeHead(200, { 'Content-Type': 'image/png' });
        response.write(file, 'binary');
        response.end();
    });
}

exports.welcome = function (request, response) {
    console.log('Rozpoczynam obługę żądania welcome.');
    fs.readFile('templates/start.html', (err, html) => {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(html);
        response.end();
    });
}

exports.error = function (request, response) {
    console.log('Nie wiem co robić.');
    response.write('404');
    response.end();
}

exports.css = function (request, response) {
    fs.readFile('style.css', (err, css) => {
        response.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
        response.write(css);
        response.end();
    });
}