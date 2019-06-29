var pool = require('./_common/db.js');
var TableMng = require('./_common/TableMng.js');
var Cliente = require('./model/Cliente.js');
var ClienteMng = require('./model/ClienteMng.js');

var o = new Cliente();
o.Id = 1;
o.Nombre = 'Cliente Uno';
//o.Codigo = '23';
var oMgn = new ClienteMng(o);
var oMng = new TableMng({
    objMng: oMgn,
    pool: pool
});

// oMng.Action('udt', function(data) {
//     console.log(data)
// });

const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => oMng.Action('lst', (data) => res.send(JSON.stringify(data))));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
