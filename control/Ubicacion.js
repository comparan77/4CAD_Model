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

Ubicacion.recibidosUbica = function(id_entrada_producto, id_almacen_movimiento, callback) {
    var factory = new Factory();
    
    var oEP = factory.CreateObj('Entrada_producto');
    oEP.Id = id_entrada_producto;
    var oEPMng = factory.CreateMng(oEP);
    
    var oAU = factory.CreateObj('Almacen_ubicacion');
    var oAUMng = factory.CreateMng(oAU);

    var oEPU = factory.CreateObj('Entrada_producto_ubicacion');
    var oEPUMng = factory.CreateMng(oEPU);

    TableMng.Action(pool, oEPMng, 'get', ()=> {
        TableMng.SelectBy(pool, oAUMng, `id_almacen_rotacion = ?
        AND referencia IS NULL LIMIT 1;`, oEP.Id_almacen_rotacion, () => {
            oAU.Referencia = oEP.Folio;
            TableMng.Action(pool, oAUMng, 'udt', ()  => {
                oEPU.Id_entrada = oEP.Id_entrada;
                oEPU.Id_entrada_producto = oEP.Id;
                oEPU.Id_almacen_ubicacion = oAU.Id;  
                oEPU.Id_almacen_movimiento = id_almacen_movimiento;  
                TableMng.Action(pool, oEPUMng, 'add', ()=> {
                    callback(oEPU);
                })
            })
        })
    })
}

Ubicacion.productosUbicadosGet = function(id_almacen_movimiento_grupo, id_entrada, callback) {
    TableMng.Execute(pool, 
        `
    SELECT
        ep.id_entrada Id_entrada
       ,ep.id Id_entrada_producto
       ,ep.folio Folio
       ,am.nombre Metodo
       ,ua.nombre Formato
       ,ep.cajas Cajas
       ,ep.piezas Piezas
   FROM 
   entrada_producto ep
   JOIN entrada_producto_ubicacion epu ON
       epu.id_entrada_producto = ep.id
   JOIN almacen_movimiento amov ON
       amov.id = epu.id_almacen_movimiento
       and amov.id_grupo = ?
   JOIN almacen_metodo am ON
       am.id = ep.id_unidad_almacenamiento
   JOIN unidad_almacenamiento ua ON
       ua.id = ep.id_unidad_almacenamiento
   WHERE ep.id_entrada = ?;
        `, [id_almacen_movimiento_grupo, id_entrada], (data) => {
            callback(data);
        });
}

module.exports = Ubicacion;