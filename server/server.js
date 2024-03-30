const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port =5000;
const userRouter = require('./router/router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.listen(port,() => {
    console.log(`Express Server is Started at a :${port}`);
})


app.get('/', (req, res) => {
    res.send(`<h2>Express server loaded</h2>`)
});


// configuring the root routers
app.use('/api',userRouter)

