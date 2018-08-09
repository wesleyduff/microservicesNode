const   app            = require('express')(),
        chalk          = require('chalk'),
        hostMapper     = require('./mappers/hostMapper'),
        { getHost, getOptions, getTableName, getIngestUri }    = require('./helpers'),
        MongoClient    = require('mongodb').MongoClient,
    cors = require('cors'),
        MONGO_PORT     = process.env.MONGO_PORT || 27017,
        MONGO_DNS      = process.env.MONGO_DNS || '127.0.0.1',
        MongoPassword  = process.env.MONGO_PASSWORD || '8c9TCT0Zts',//where local will be your local mongo password
        url            = `mongodb://root:${MongoPassword}@${MONGO_DNS}:${MONGO_PORT}`, //Ports should all be the same
        databaseName   = 'doc';

let mongoClient = null,
    mongoDatabase = null;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const RestAPI = require('./routes/index');

// MongoClient.connect(url, (err, client) => {
//     if (err) {
//         console.log('mongo db connect issue -> ', err)
//     } else {
//         mongoDatabase = client.db(databaseName);
//         mongoClient = client;
//
//
//        // client.close(); todo:// how will we close this;
//     }
// });

/**
 * Middleware to catch host name
 */
app.use(cors());
app.use((req, res, next) => {
    const host = getHost(req);
    const options = getOptions(req);
    console.log('---- options ----');
    console.log(options)
    let controllerData = null;
    if(req.query.ingesturi){
        controllerData = hostMapper({type: 'query', host: req.query.ingesturi});
    } else {
        controllerData = hostMapper({type: 'host', host});
    }
    console.log(`----- host mapper mapped : ${controllerData.ingestUri} : ${controllerData.type} : ${controllerData.table}`)
    req.host = host;
    req.controller = controllerData.controller;
    req.ingestURI = controllerData.ingestUri;
    req.table = controllerData.tableName;
    req.mongoDatabase = mongoDatabase;
    req.mongoClient = mongoClient;
    if(options){
        req.options = options;
    }
    next();
})

/**
 * Set Routes
 */
app.use('/', RestAPI);



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

app.listen(8080,() => {
    console.log(chalk.green(`Listening on port : 8080 - server running`))
})