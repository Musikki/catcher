var connect = require('connect'),
    winston = require('winston'),
    transports = [new (winston.transports.File)({ filename: 'assets/logs/catcher.json' })],
    logger;

if (process.env.DEBUG) {
    transports.push(new (winston.transports.Console)());
}

logger = new (winston.Logger)({ transports: transports });


exports.title = 'Catcher';

console.log(__dirname + '/../assets')

var app = connect()
    .use(connect.bodyParser())
    .use(connect.responseTime())
    .use(connect.errorHandler())
    .use(connect.static(__dirname + '/../assets'))
    .use(function (request, response) {
        if (request.method === 'POST') {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.end();

            logger.error(request.body);
        }
    })
    .listen(3000);
