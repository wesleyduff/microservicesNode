 const app = require('express')();
const chalk = require('chalk');
var pgp = require('pg-promise')();
const db = pgp('postgres://postgres:N5xa0K8tyN@postgres-postgresql.default.svc.cluster.local:5432/rds')

app.get('/', (req, res) => {
    res.send('Raven - RDS - Relational Injest');
});

app.get('/api/rds/healthcheck', (req, res) => {
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
app.get("/api/rds/:id", (req, res) => {
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