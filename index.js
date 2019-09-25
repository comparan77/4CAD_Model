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
app.get('/almacen', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/aduana', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/cliente', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/documento', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/vendor', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/transporte_linea', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/transporte_linea_tipo/:id', (req, res) => {
  Catalogo.GetTransporteTipoByLinea(req.params.id, (data) => res.send(JSON.stringify(data)));
})
app.get('/vendor_mercancia/:id', (req, res) => {
  Catalogo.GetMercanciaByVendor(req.params.id, (data) => res.send(JSON.stringify(data)));
})
app.get('/almacen_build/:id_almacen/zona/:id_zona', (req, res) => {
  Catalogo.AlmacenBuild(req.params.id_almacen, req.params.id_zona, (data) => res.send(JSON.stringify(data)));
})
app.get('/almacen_build_cod/:id_almacen/padre/:padre/nivel/:nivel/cantidad/:cantidad', (req, res) => {
  Catalogo.AlmacenBuildCod(req.params, (data) => res.send(JSON.stringify(data)));
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
  Operacion.getAsnSchedule((data) => res.send(JSON.stringify(data)))
})
app.get('/asn_schedule/:cliente', (req, res) => {
  Operacion.getAsnScheduleByCliente(req.params.cliente, (data) => res.send(JSON.stringify(data)))
})
// Recepcion en cortinas
app.get('/asn_rec_cortina', (req, res) => {
  Operacion.getAsnRecepcionCortina((data) => res.send(JSON.stringify(data)))
})
app.get('/asn_rec_cortina/:almacen', (req, res) => {
  Operacion.getAsnRecepcionCortinaByAlmacen(req.params.almacen, (data) => res.send(JSON.stringify(data)))
})
app.get('/asn_rec_cortina_id/:id', (req, res) => {
  Operacion.getAsnRecepcionCortinaById(req.params.id, (data) => res.send(JSON.stringify(data)))
})

// Para catalogos
function getStrReq(req) {
    var strReq = req.originalUrl;
    strReq = Common.Capitalize(strReq.replace('/',''));
    return strReq;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
