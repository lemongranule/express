const express = require('express');

const cluster = require('cluster');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

var logger = require('morgan');

var app = express();

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(logger());


//路由

app.use(require('./routes/root'));
app.use(require('./routes/index'));


// var router1 =  require('./routes/router1');
// app.use('/router1', router1);


app.get('*', function(req, res) {  
    res.render('404.html')
})

// 启动服务
const port = 6325
if (cluster.isMaster) {

  for (let i = 0; i < 1; i++) {
    cluster.fork();
  }

  cluster.on('listening', function(worker, address) {
    console.log(`server is listening: pid=${worker.process.pid}, address=${address.address}:${address.port}`);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.error(`server exit: pid= ${worker.process.pid}`);
  });

  console.log(`[app.env] ${app.env}`);

} else {
  app.listen(port);
}


module.exports = app;
