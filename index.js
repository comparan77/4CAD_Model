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
app.get('/vendor_producto/:id', (req, res) => {
  Catalogo.vendorProductoGetByVendor(req.params.id, (data) => res.send(JSON.stringify(data)));
})
app.get('/almacen_build_cod/:id_almacen_zona/padre/:padre/nivel/:nivel/cantidad/:cantidad', (req, res) => {
  Catalogo.AlmacenBuildCod(req.params, (data) => res.send(JSON.stringify(data)));
})
app.get('/almacen_ubicacionBuildByZona/:id_almacen_zona', (req, res) => {
  Catalogo.Almacen_ubicacionBuild(req.params.id_almacen_zona, (data) => res.send(JSON.stringify(data)));
})
app.get('/almacen_zona', (req, res) => { Catalogo.Almacen_zonas((data) => res.send(JSON.stringify(data)))})
app.get('/almacen_zona/:id_almacen', (req, res) => { Catalogo.Almacen_zonasByAlmacen(req.params.id_almacen, (data) => res.send(JSON.stringify(data)))})
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
// Recepcion
app.get('/recibidos', (req, res) => {
  Operacion.recibidosGet((data) => res.send(JSON.stringify(data)));
})


// Operacion
// Get
app.get('/entrada_producto/:id_entrada', (req, res) => {
  Operacion.entrada_productoLstBy(req.params.id_entrada, (data) => res.send(JSON.stringify(data)));
})
app.get('/ubicados/:key', (req, res) => { 
  Operacion.ubicadosGet(req.params.key, (data) => res.send(JSON.stringify(data)));
})
app.get('/productos_ubicados/:gpo/key/:key', (req, res) => { 
  Operacion.productosUbicadosGet(req.params.gpo, req.params.key, (data) => res.send(JSON.stringify(data)));
})

// Post
app.post('/asn', (req, res) => {
  Operacion.asn_Add(req.body, () => {
    res.send('Ready');
  });
});

app.post('/entrada', (req, res) => {
  console.log(req.body);
  Operacion.entradaAdd(req.body, () => {
    res.send('Ready');
  })
})
// Put
// Ubica recibidos
app.put('/recibidos_ubica/', (req, res) => {
  Operacion.recibidosUbica(req.body.id_entrada_producto, req.body.id_almacen_movimiento, (data) => res.send(JSON.stringify(data)));
})

// Para catalogos
function getStrReq(req) {
    var strReq = req.originalUrl;
    strReq = Common.Capitalize(strReq.replace('/',''));
    return strReq;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
