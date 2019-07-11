// app.get('/cliente', (req, res) => {
//     var factory = new Factory();
//     var o = factory.CreateObj('Cliente');
//     var oTMng = factory.CreateMng(o);
    
//     oTMng.Action('lst', (data) => 
//     res.send(JSON.stringify(data)))
// });

// app.get('/aduana', (req, res) => {
//     var factory = new Factory();
//     var o = factory.CreateObj('Aduana');
//     var oTMng = factory.CreateMng(o);
    
//     oTMng.Action('lst', (data) => 
//     res.send(JSON.stringify(data)))
// });

var Factory = require('./model/Factory.js');
var Common = require('../common/Common.js');

const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/transporte_linea_tipo/:id', (req, res) => {

  var factory = new Factory();
  var o = factory.CreateObj('Transporte_linea_tipo');
  var oTMng = factory.CreateMng(o);

  oTMng.Select(`select tt.Id, tt.Nombre 
                  from transporte_linea_tipo tlt 
                join transporte_linea tl on
                  tlt.id_transporte_linea = tl.id
                join transporte_tipo tt on
                  tlt.id_transporte_tipo = tt.id
                where tl.id = ?`, req.params.id, (data => {
    res.send(JSON.stringify(data));
  }));

})

app.get('/aduana', (req, res) => lstCatalogo(req, (data) => res.send(data)));
app.get('/cliente', (req, res) => lstCatalogo(req, (data) => res.send(data)));
app.get('/documento', (req, res) => lstCatalogo(req, (data) => res.send(data)));
app.get('/mercancia_vendor', (req, res) => lstCatalogo(req, (data) => res.send(data)));
app.get('/transporte_linea', (req, res) => lstCatalogo(req, (data) => res.send(data)));

function lstCatalogo(req, callback) {

    var strReq = req.originalUrl;
    strReq = Common.Capitalize(strReq.replace('/',''));
    var factory = new Factory();
    var o = factory.CreateObj(strReq);
    var oTMng = factory.CreateMng(o);

    oTMng.Action('lst', (data) => {
      callback(JSON.stringify(data));
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
