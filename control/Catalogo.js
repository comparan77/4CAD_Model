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

// Vendor mercancia
// Get mercancia by vendor
Catalogo.GetMercanciaByVendor = function(id, callback) {

    TableMng.Select(pool, `select vm.Id, vm.Nombre
                    from vendor_mercancia vm 
                    join vendor v on
                    vm.id_vendor = v.id
                    where v.id = ?`, id, (data => {
        callback(data);
    }));
}

// Almacen Layout
// Build 
Catalogo.AlmacenBuild = function(id_almacen, id_zona, callback) {
    var factory = new Factory();
    
    var oA_P = factory.CreateObj('Almacen_plantilla');
    var oA_PMng = factory.CreateMng(oA_P);

    var oAc = factory.CreateObj('Almacen_codificacion');
    var oAcMng = factory.CreateMng(oAc);

    var oAz = factory.CreateObj('Almacen_zona');
    oAz.Id = id_zona;
    var oAzMng = factory.CreateMng(oAz);

    var oAl = factory.CreateObj('Almacen_layout');
    var oAlMng = factory.CreateMng(oAl);

    TableMng.SelectBy(pool, oA_PMng, `id_almacen = ?`, id_almacen, () => {
        TableMng.SelectBy(pool, oAcMng, 'id_tipo_codificacion = ? order by nivel desc', oA_P.Id_tipo_codificacion, (cods) => {
            TableMng.Action(pool, oAzMng, 'get', () => {
                oAl.Id_almacen = id_almacen;
                oAl.Nombre = oAz.Nombre;
                oAl.Clave = oAz.Clave;
                TableMng.Action(pool, oAlMng, 'add', () => {
                    callback(oAl);
                })       
                //callback(cods);
            })            
        })
    });
}

module.exports = Catalogo;