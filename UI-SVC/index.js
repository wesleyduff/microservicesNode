const
    express         = require('express'),
    app             = express(),
    logger          = require('morgan'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    chalk           = require('chalk')

//This is for self signed SSL -> because we are behind the corporate firewall
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const main = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//assign the swig view engine to .html files
var swig = require('swig');
app.engine('html', swig.renderFile);


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

app.listen(3000,() => {
    console.log(chalk.green(`Listening on port : 3001 - server running`))
})