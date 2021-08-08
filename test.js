var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
// var geoip = require('geoip-country');
const { default: axios } = require('axios');

var dir = path.join(__dirname, 'public');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', async function (req, res) {

    // const country = geoip.lookup(req.ip) || 'US';

    const f = await axios.get('https://www.countryflags.io/' + "pl" + '/flat/64.png', {responseType: 'arraybuffer'});
    // console.log(f.data);

    res.contentType(mime.png);
    res.setHeader('Content-Length', f.data.length);
    res.write(f.data);
    res.sendStatus()
    // res.send(Buffer.from(f.data, 'binary').toString('base64'));

    // res.redirect(301, );
    
});

app.listen(3000, function () {
    console.log('Listening on http://localhost:3000/');
});