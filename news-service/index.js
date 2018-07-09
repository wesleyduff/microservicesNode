const app = require('express')();
const chalk = require('chalk');

// const MongoClient = require('mongodb').MongoClient
// let db = null;
// MongoClient.connect('mongodb://mongo:27017/news', function (err, db_access) {
//     if (err) throw err
//     db = db_access;
// })

app.get('/', (req, res) => {
    res.send('Raven - NEWS - API');
});

app.get("/api/news/:id", (req, res) => {
    // const doc = db.breakingNews.find();
    // res.json(doc);
    const id = parseInt(req.params.id);
    res.json({
        id: id,
        ref: `NEWS-${id}`,
        amount: id * 100,
        balance: (id * 100) - 10,
        ccy: "CNN",
        raven: 'RAV-123'
    })
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(chalk.green(`Listening for news on port : ${port} - server running`))
})