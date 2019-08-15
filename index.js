var Catalogo = require('./control/Catalogo.js')
var Common = require('../common/Common.js');

const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/aduana', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/cliente', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/documento', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/mercancia_vendor', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/transporte_linea', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/transporte_linea_tipo/:id', (req, res) => {
  Catalogo.GetTransporteTipoByLinea(req.params.id, (data) => res.send(data));
})

function getStrReq(req) {

    var strReq = req.originalUrl;
    strReq = Common.Capitalize(strReq.replace('/',''));
    return strReq;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
