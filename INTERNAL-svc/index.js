const app = require('express')();
const chalk = require('chalk');

app.get('/', (req, res) => {
    res.send('Raven - INTERNAL');
});

app.get("/api/internal/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json({
        id: id,
        ref: `INT-${id}`,
        amount: id * 100,
        balance: (id * 100) - 10,
        ccy: "INT",
        raven: 'RAV-123'
    })
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(chalk.green(`Listening for news on port : ${port} - server running`))
})