function Ubicacion () {};
var pool = require('../_common/db.js');
var TableMng = require('../_common/TableMng.js');
// var Factory = require('../model/Factory.js');

Ubicacion.ubicadosGet = function(id_almacen_movimiento_grupo, callback) {
    TableMng.Execute(pool, 
        `
SELECT DISTINCT
     c.nombre Cliente
    ,e.id Id_entrada
    ,e.folio Folio
    ,COALESCE(rf.Referencia, '') Referencias
FROM entrada_producto_ubicacion epu 
JOIN entrada e ON
    e.id = epu.id_entrada
JOIN asn a ON
    e.id_asn = a.id
JOIN cliente c ON
    c.id = a.id_cliente
JOIN almacen_movimiento am ON
    am.id = epu.id_almacen_movimiento
    and am.id_grupo = ?
LEFT JOIN asn_documento ad ON
    ad.id_asn = a.id
LEFT JOIN documento d ON
    d.id = ad.id_documento
LEFT JOIN (
    SELECT 
        tbl.Id_asn Id_asn
        ,GROUP_CONCAT(tbl.Referencia separator ', ') Referencia
    FROM (
    SELECT
        a.id Id_asn
        ,CONCAT(d.nombre, ':', GROUP_CONCAT(ad.referencia separator ',')) Referencia
    FROM asn_documento ad
    JOIN asn a ON
        a.id = ad.id_asn
    JOIN documento d ON
        d.id = ad.id_documento
    GROUP BY a.id, ad.id) tbl GROUP BY tbl.Id_asn
) rf ON
    a.id = rf.Id_asn;
        `, id_almacen_movimiento_grupo, (data) => {
            callback(data);
        });
}

module.exports = Ubicacion;