var pool = require('../_common/db.js');
var TableMng = require('../_common/TableMng.js');
var Factory = require('../model/Factory.js');

function Catalogo () {};

Catalogo.lstCatalogo = function(strObj, callback) {

    var factory = new Factory();
    var o = factory.CreateObj(strObj);
    var oMng = factory.CreateMng(o);

    TableMng.Action(pool, oMng, 'lst', (data) => {
      callback(data);
    })
}

// Transporte tipo
// Get transporte tipo by linea
Catalogo.GetTransporteTipoByLinea = function(id, callback) {

    TableMng.Select(pool, `select tt.Id, tt.Nombre, tt.placa, tt.caja, tt.cont_1, tt.cont_2 
                    from transporte_linea_tipo tlt 
                    join transporte_linea tl on
                    tlt.id_transporte_linea = tl.id
                    join transporte_tipo tt on
                    tlt.id_transporte_tipo = tt.id
                    where tl.id = ?`, id, (data => {
        callback(data);
    }));
}

// Vendor producto
// Get producto by vendor
Catalogo.vendorProductoGetByVendor = function(id, callback) {

    TableMng.Select(pool, `select vm.Id, vm.Nombre
                    from vendor_producto vm 
                    join vendor v on
                    vm.id_vendor = v.id
                    where v.id = ?`, id, (data => {
        callback(data);
    }));
}

// Almacen Layout
// Build 

Catalogo.AlmacenBuildCod = function(params, callback) {

    var factory = new Factory();

    var oA_P = factory.CreateObj('Almacen_plantilla');
    var oA_PMng = factory.CreateMng(oA_P);

    var oAc = factory.CreateObj('Almacen_codificacion');
    var oAcMng = factory.CreateMng(oAc);

    TableMng.SelectBy(pool, oA_PMng, `id_almacen_zona = ?`, params.id_almacen_zona, () => {
        TableMng.SelectBy(pool, oAcMng, 'id_tipo_codificacion = ? and nivel = ?', [oA_P.Id_tipo_codificacion, params.nivel], () => {
            Catalogo.Alamcen_layoutAdd(params.id_almacen_zona, oAc, params.padre, params.cantidad, 1, () => {
                callback('ready');
            })
        });    
    });
}

Catalogo.Alamcen_layoutAdd = function(id_almacen_zona, oAc, padre, cantidad, indice, callback) {
    
    var factory = new Factory();

    var oAl = factory.CreateObj('Almacen_layout');
    var oAlMng = factory.CreateMng(oAl);

    var strClave =  indice.toString().padStart(oAc.Digitos, "0");

    oAl.Id_almacen_zona = id_almacen_zona;
    oAl.Nombre = oAc.Nombre + ' ' + strClave;
    oAl.Clave = strClave;
    oAl.Padre = padre;
    oAl.Nivel = oAc.Nivel;

    if(indice <= cantidad) {
        TableMng.Action(pool, oAlMng, 'add', () => {
            indice++;
            Catalogo.Alamcen_layoutAdd(id_almacen_zona, oAc, padre, cantidad, indice, callback);
        });
    }
    else
        callback();
}

Catalogo.Almacen_zonas = function(callback) {
    TableMng.Select(pool, `
SELECT
    a.id
   ,a.nombre almacen
   ,count(az.id) zonas
FROM
   almacen a
LEFT JOIN almacen_zona az ON 
   a.id = az.id_almacen
GROUP BY a.id;
    `, null, (data) => {
        callback(data);
    })
}

Catalogo.Almacen_zonasByAlmacen = function(id_almacen, callback) {
    
    var factory = new Factory();

    var oAl = factory.CreateObj('Almacen_zona');
    var oAlMng = factory.CreateMng(oAl);

    var oAtc = factory.CreateObj('Almacen_tipo_codificacion');
    var oAtc_Mng = factory.CreateMng(oAtc);

    TableMng.SelectBy(pool, oAlMng, `id_almacen = ? order by clave asc`, id_almacen, (lstAZ) => {
        TableMng.Action(pool, oAtc_Mng, 'lst', (lstTC) => {

            lstAZ.forEach(item => {
                item.Tipo = '-';
                oAtc = lstTC.find((obj)=> {
                    return item.Id_tipo_codificacion == obj.Id;

                })
                ;
                if(oAtc) {
                    item.Tipo = oAtc.Nombre;
                }
            })
            callback(lstAZ);
        })
    })
}

module.exports = Catalogo;