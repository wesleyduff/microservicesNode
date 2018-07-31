const   app            = require('express')(),
        chalk          = require('chalk'),
        hostMapper     = require('./mappers/hostMapper'),
        { getHost }    = require('./helpers'),
        MongoClient    = require('mongodb').MongoClient,
        PORT           = process.env.PORT || 27017,
        MONGO_DNS = process.env.MONGO_DNS || '127.0.0.1',
        MongoPassword  = process.env.MONGO_PASSWORD || '8c9TCT0Zts',//where local will be your local mongo password
        url            = `mongodb://root:${MongoPassword}@${MONGO_DNS}:${PORT}`, //Ports should all be the same
        databaseName   = 'doc',
        pgp = require('pg-promise')(),
        pgPort = process.env.PG_PORT || '5432',
        pgPassword = process.env.PG_PASSWORD || 'N5xa0K8tyN',
        pgDatabase = pgp(`postgres://postgres:${pgPassword}@postgres-postgresql.default.svc.cluster.local:${pgPort}/test`)


let mongoClient = null,
    mongoDatabase = null;


const main = require('./routes/index');

MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log('mongo db connect issue -> ', err)
    } else {
        mongoDatabase = client.db(databaseName);
        mongoClient = client;


       // client.close(); todo:// how will we close this;
    }
});

/**
 * Middleware to catch host name
 */
app.use((req, res, next) => {
    const host = getHost(req);
    const controller = hostMapper(host).controller;
    req.host = host;
    req.controller = controller;

    req.mongoDatabase = mongoDatabase;
    req.pgDatabase = pgDatabase;
    req.mongoClient = mongoClient;
    next();
})

/**
 * Set Routes
 */
app.use('/', main);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
                error: err
            }
        });
    });
}


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(chalk.green(`Listening on port : ${port} - server running`))
})