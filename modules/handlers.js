const fs = require('fs');
const formidable = require('formidable');

exports.upload = function (request, response) {
    console.log('Rozpoczyniam obsługę żądania upload.');
    let form = new formidable.IncomingForm();
    form.parse(request, (error, fields, files) => {
        console.log(files.upload.name);
        fs.renameSync(files.upload.path, files.upload.name);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('Recieved image:<br>');
        response.write('<img src="/show">');
        response.end();
    });
}

exports.show = function (request, response) {
    fs.readFile('test.png', 'binary', (err, file) => {
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