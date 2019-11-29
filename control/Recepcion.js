var pool = require('../_common/db.js');
var Catalogo = require('./Catalogo.js')
var TableMng = require('../_common/TableMng.js');
var Factory = require('../model/Factory.js');

function Recepcion () {};

Recepcion.asn_producto_detalle_by_cte = function(id_cte, callback) {
    TableMng.Execute(pool, 'show columns from asn_producto_detalle_' + id_cte, null, function(data) {
        callback(data);        
    }, function(err) {
        callback(null)
    });
}

module.exports = Recepcion;