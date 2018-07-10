const app = require('express')();
const chalk = require('chalk');
const url = 'mongodb://root:wgKN0YX79T@joking-seal-mongodb.default.svc.cluster.local:27017'
// Database Name
const dbName = 'sports';

app.get('/', (req, res) => {
    res.json({
        service: 'a'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(chalk.green(`Listening for sports on port : ${port} - server running`))
})