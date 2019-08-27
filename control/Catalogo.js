var Factory = require('../model/Factory.js');

function Catalogo () {};

Catalogo.lstCatalogo = function(strObj, callback) {

    var factory = new Factory();
    var o = factory.CreateObj(strObj);
    var oTMng = factory.CreateMng(o);

    oTMng.Action('lst', (data) => {
      callback(JSON.stringify(data));
    })
}

// Transporte tipo
// Get transporte tipo by linea
Catalogo.GetTransporteTipoByLinea = function(id, callback) {
    var factory = new Factory();
    var o = factory.CreateObj('Transporte_linea_tipo');
    var oTMng = factory.CreateMng(o);

    oTMng.Select(`select tt.Id, tt.Nombre, tt.placa, tt.caja, tt.cont_1, tt.cont_2 
                    from transporte_linea_tipo tlt 
                    join transporte_linea tl on
                    tlt.id_transporte_linea = tl.id
                    join transporte_tipo tt on
                    tlt.id_transporte_tipo = tt.id
                    where tl.id = ?`, id, (data => {
        callback(JSON.stringify(data));
    }));
}

// Vendor mercancia
// Get mercancia by vendor
Catalogo.GetMercanciaByVendor = function(id, callback) {
    var factory = new Factory();
    var o = factory.CreateObj('Vendor_mercancia');
    var oTMng = factory.CreateMng(o);

    oTMng.Select(`select vm.Id, vm.Nombre
                    from vendor_mercancia vm 
                    join vendor v on
                    vm.id_vendor = v.id
                    where v.id = ?`, id, (data => {
        callback(JSON.stringify(data));
    }));
}

module.exports = Catalogo;