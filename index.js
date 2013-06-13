return (process.env.CATCHER_COVERAGE) ?
        require('./coverage/server.js') :
        require('./lib/server.js');

