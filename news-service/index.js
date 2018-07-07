const app = require('express')();
const chalk = require('chalk');

app.get('/', (req, res) => {
    res.send('Raven - NEWS - API');
});

app.get("/api/news/:id", (req, res) => {
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