const app = require('express')();
const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:5g9x4FiHCU@vocal-alpaca-mongodb.default.svc.cluster.local:27017'
// Database Name
const dbName = 'sports';

app.get('/', (req, res) => {
    res.send('Raven - Sports - API');
});

app.get('/api/sports/healthcheck', (req, res) => {
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

app.get("/api/sports/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json({
        id: id,
        ref: `SPORTS-${id}`,
        amount: id * 100,
        balance: (id * 100) - 10,
        ccy: "HAWKS",
        raven: 'RAV-123'
    })
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('----> network ', {})
    console.log(chalk.green(`Listening for sports on port : ${port} - server running`))
})