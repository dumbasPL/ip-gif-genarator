const express = require('express');
const app = express();
const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const e = require('express');
var geoip = require('geoip-lite');

const port = 51337;

app.get('/benawad_will_kill_me/why_am_i_doing_this.png', (req, res) => {
  const encoder = new GIFEncoder(100, 100);
  encoder.createReadStream().pipe(res);
  
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(1000);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.
  
  // use node-canvas
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');

  let ip = res.header['X-Forwarded-For'] ?? req.ip;
  
  ctx.font = '14px Arial';
  ctx.fillStyle = '#550000';
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText("your ip is:", 20, 40, 90);
  ctx.fillText(req.ip, 5, 65, 90);
  encoder.addFrame(ctx);
  
  var geo = geoip.lookup("1.1.1.1");

  if (geo) {
    ctx.fillStyle = '#005500';
    ctx.fillRect(0, 0, 320, 240);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("your are from:", 5, 40, 90);
    ctx.fillText(geo.country, 40, 65, 90);
  } 

  encoder.addFrame(ctx);
  
  // // blue rectangle
  // ctx.fillStyle = '#0000ff';
  // ctx.fillRect(0, 0, 320, 240);
  // encoder.addFrame(ctx);
  
  encoder.finish();

  // re

});

app.listen(port, '0.0.0.0',() => {
  console.log(`listening at http://localhost:${port}/benawad_will_kill_me/why_am_i_doing_this.png`);
});