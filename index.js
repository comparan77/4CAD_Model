var Catalogo = require('./control/Catalogo.js')
var Operacion = require('./control/Operacion.js')

var Common = require('../common/Common.js');

const express = require('express')
const app = express()
const port = 3002

// const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.json());
app.use(express.json());

// Catálogos
// Get
app.get('/aduana', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/cliente', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/documento', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/vendor', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/transporte_linea', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(data)));
app.get('/transporte_linea_tipo/:id', (req, res) => {
  Catalogo.GetTransporteTipoByLinea(req.params.id, (data) => res.send(data));
})
app.get('/vendor_mercancia/:id', (req, res) => {
  Catalogo.GetMercanciaByVendor(req.params.id, (data) => res.send(data));
})
app.get('/folio/:tipo', (req, res) => {
  Operacion.folioGetByTipo(req.params.tipo, (data) => res.send(data));
})

// Operacion
// Post
app.post('/asn', (req, res) => {
  Operacion.addAsn(req.body, (data) => {
    res.send('Ready');
  });
});
// Schedules
app.get('/asn_schedule', (req, res) => {
  Operacion.getAsnSchedule((data) => {
    res.send(data);
  })
})

function getStrReq(req) {

    var strReq = req.originalUrl;
    strReq = Common.Capitalize(strReq.replace('/',''));
    return strReq;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
