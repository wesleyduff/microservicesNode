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
    res.send(`UI Service : host called is ${host} and the target is ${target}`)
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(chalk.green(`Listening on port : ${port} - server running`))
})