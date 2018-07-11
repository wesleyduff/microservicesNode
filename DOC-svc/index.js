const app = require('express')();
const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:8WgiirOZl7@mongo-mongodb.default.svc.cluster.local:27017'
// Database Name
const dbName = 'doc';

app.get('/', (req, res) => {
    res.send('Raven - DOC - Document Base Injest');
});

app.get('/api/doc/healthcheck', (req, res) => {
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

app.get("/api/doc/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json({
        id: id,
        ref: `doc-${id}`,
        type: "Relational",
        raven: 'RAV-DOC'
    })
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(chalk.green(`Listening for sports on port : ${port} - server running`))
})