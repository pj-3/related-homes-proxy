require('newrelic');
const express = require('express');
const cors = require('cors');

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});


const app = express();
const port = 2985;

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));


app.all('/v1/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:5000"
    }, (err) => {  console.log(err); return res.status(404).send(); });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))