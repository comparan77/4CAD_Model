var Catalogo = require('./control/Catalogo.js')
//var Operacion = require('./control/Operacion.js')
var Recepcion = require('./control/Recepcion.js')
var Ubicacion = require('./control/Ubicacion.js')

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

/** CATALOGOS */
// Get
app.get('/almacen', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/aduana', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/cliente', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/documento', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/vendor', (req, res) => Catalogo.lstCatalogo(getStrReq(req), (data) => res.send(JSON.stringify(data))));
app.get('/transportelinea', (req, res) => Catalogo.lstCatalogo('TransporteLinea', (data) => res.send(JSON.stringify(data))));
app.get('/transportelineatipo/:id', (req, res) => {
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

// Para catalogos
function getStrReq(req) {
  var strReq = req.originalUrl;
  strReq = Common.Capitalize(strReq.replace('/',''));
  return strReq;
}

/** RECEPCION */
app.get('/asn_schedule', (req, res) => {
  Recepcion.asnGetSchedule((data) => res.send(JSON.stringify(data)))
})
app.get('/asn_schedule/:cliente', (req, res) => {
  Recepcion.asnGetScheduleByCliente(req.params.cliente, (data) => res.send(JSON.stringify(data)))
})
// Recepcion en cortinas
app.get('/asn_rec_cortina', (req, res) => {
  Recepcion.asnGetRecepcionCortina((data) => res.send(JSON.stringify(data)))
})
app.get('/asn_rec_cortina/:almacen', (req, res) => {
  Recepcion.asnGetRecepcionCortinaByAlmacen(req.params.almacen, (data) => res.send(JSON.stringify(data)))
})
app.get('/asn_rec_cortina_id/:id', (req, res) => {
  Recepcion.asnGetRecepcionCortinaById(req.params.id, (data) => res.send(JSON.stringify(data)))
})
// Recepcion
app.get('/recibidos', (req, res) => {
  Recepcion.recibidosGet((data) => res.send(JSON.stringify(data)));
})
// Revision de sello
app.get('/asn_selloSearch/:sello', (req, res) => {
  Recepcion.asnSelloSearch(req.params.sello, (data) => res.send(JSON.stringify(data)))
})
// Operacion
// Get
app.get('/entrada_producto/:id_entrada', (req, res) => {
  Recepcion.entrada_productoLstBy(req.params.id_entrada, (data) => res.send(JSON.stringify(data)));
})
// Post
app.post('/asn', (req, res) => {
  Recepcion.asn_Add(req.body, () => {
    res.send('Ready');
  });
});
app.post('/asn_share', (req, res) => {
  Recepcion.asnShare_Add(req.body, () => {
    res.send('Ready');
  });
});
app.post('/entrada', (req, res) => {
  console.log(req.body);
  Recepcion.entradaAdd(req.body, () => {
    res.send('Ready');
  })
})
// Recepción
app.get('/asn_producto_detalle_by_cte/:key', (req, res) => {
  Recepcion.asn_producto_detalle_by_cte(req.params.key, (data) => {
    res.send(JSON.stringify(data));
  })
})

//** UBICACION */
app.get('/ubicados/:key', (req, res) => { 
  Ubicacion.ubicadosGet(req.params.key, (data) => res.send(JSON.stringify(data)));
})
app.get('/productos_ubicados/:gpo/key/:key', (req, res) => { 
  Ubicacion.productosUbicadosGet(req.params.gpo, req.params.key, (data) => res.send(JSON.stringify(data)));
})
// Put
// Ubica recibidos
app.put('/recibidos_ubica/', (req, res) => {
  Ubicacion.recibidosUbica(req.body.id_entrada_producto, req.body.id_almacen_movimiento, (data) => res.send(JSON.stringify(data)));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
