const app = require('express')();
const chalk = require('chalk');
const fetch = require('node-fetch');
const url = 'mongodb://root:wgKN0YX79T@joking-seal-mongodb.default.svc.cluster.local:27017'
// Database Name
const dbName = 'sports';

app.get('/', (req, res) => {
    res.send('service B ');
});

app.get('/call/servicea', (req, res) => {
    console.log('calling serice a ');
    fetch('http://localhost:3000')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            res.json({
                data: myJson
            })
        });
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(chalk.green(`Listening for sports on port : ${port} - server running`))
})