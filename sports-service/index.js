const app = require('express')();
const chalk = require('chalk');

app.get('/', (req, res) => {
    res.send('Raven - Sports - API');
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