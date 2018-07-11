const app = require('express')();
const chalk = require('chalk');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const ipAddresses = require('./constants');
const hostMapper = require('./mappers/hostMapper');
const { getHost } = require('./helpers')

let target = null,
    host = null;


app.use((req, res, next) => {
    host = getHost(req);
    target = hostMapper(host).target;
    console.log('---> target middleware: ', target)
    next();
})

app.get('/', (req, res) => {
    res.send('Base proxy app for raven testing')
});

app.all("/api/*", (req, res) => {
    apiProxy.web(req, res, {target});
});


// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('setting header from proxy')
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    res.set('X-Special-Header', 'baz');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(chalk.green(`Listening on port : ${port} - server running`))
})