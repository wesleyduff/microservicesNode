const app = require('express')();
const chalk = require('chalk');
var pgp = require('pg-promise')();
const db = pgp('postgres://postgres:N5xa0K8tyN@postgres-postgresql.default.svc.cluster.local:5432/push')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:8WgiirOZl7@mongo-mongodb.default.svc.cluster.local:27017'
// Database Name
const dbName = 'push';

app.get('/', (req, res) => {
    res.send('Raven - PUSH - Relational / Document Injest');
});

app.get('/api/push/healthcheck/postgres', (req, res) => {
    db.any('SELECT * FROM test')
        .then(function (data) {
            const result = JSON.stringify(data[0]);
            res.send(result)
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            res.send('error : ' + error)
        })
});

app.get('/api/push/healthcheck/mongo', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            res.json({
                err
            })
        } else {
            const db = client.db(dbName);
            db.collection('lakers').find().toArray((error, result) =>{
                if(error) {
                    console.log(error);
                    res.json({
                        error
                    });
                } else {
                    console.log(result);
                    res.json({
                        result
                    })
                }
            });
            client.close();
        }
    });

});


app.get("/api/push/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json({
        id: id,
        ref: `RDS-${id}`,
        amount: id * 100,
        balance: (id * 100) - 10,
        ccy: "RDS",
        raven: 'RAV-123'
    })
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(chalk.green(`Listening for news on port : ${port} - server running`))
})