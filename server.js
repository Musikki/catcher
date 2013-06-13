var connect = require('connect'),
    fs = require('fs'),
    writeStream = fs.createWriteStream('catcher.log', {flags: 'a'});

writeStream.on('error', function (err) {
    console.log(err);
});

var app = connect()
    .use(connect.bodyParser())
    .use(function (req, resp) {
        // answer immediatly so that the browser doesn't wait.
        resp.setHeader('Access-Control-Allow-Origin', '*');
        resp.end('1');

        var ip = req.connection.remoteAddress,
            data = req.body;

        data.ip = ip;

        writeStream.write(JSON.stringify(data) + '\n');

    }).listen(3000);
