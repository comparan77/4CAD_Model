var pool = require('../_common/db.js');
var TableMng = require('../_common/TableMng.js');
var Factory = require('../model/Factory.js');

function Operacion () {};

// Consultas a la base de datos genéricas
// Fecha
Operacion.getAnioActFromDB = function(callback) {
    TableMng.Select(pool, 'select year(now()) YearDb from dual', '', callback, () => {
        callback(data);
    })
}

// Folio
// Get By tipo
Operacion.getFolioByTipo = function(tipo, callback) {

    var factory = new Factory();
    var oFolio = factory.CreateObj('Folio');
    var oFolioMng = factory.CreateMng(oFolio);
    var _data;
    var strFolio;

    TableMng.SelectBy(pool, oFolioMng, `tipo = ?`, tipo, (data) => {
        _data = data;
        Operacion.getAnioActFromDB((data) => {
            if(data[0].YearDb != oFolio.Anio_actual) {
                oFolio.Anio_actual = data[0].YearDb;
                oFolio.Actual = 2;
                TableMng.Action(pool, oFolioMng, 'udt', () => {
                    strFolio =  '1'.padStart(oFolio.Digitos, "0");
                    strFolio = oFolio.Tipo + '-' + strFolio + '-' + data[0].YearDb.toString().substr(2, 2);
                    callback(strFolio);
                })
            } else {
                strFolio =  oFolio.Actual.toString().padStart(oFolio.Digitos, "0");
                strFolio = oFolio.Tipo + '-' + strFolio + '-' + oFolio.Anio_actual.toString().substr(2, 2);
                oFolio.Actual = oFolio.Actual + 1;
                TableMng.Action(pool, oFolioMng, 'udt', () => {
                    callback(strFolio);
                })     
            }
        });
    });
    
}

// Asn 
// Add
Operacion.addAsn = function(obj, callback) {

    var factory = new Factory();
    var oAsn = factory.CreateObj('Asn');

    Object.keys(obj).forEach(item => {
        if(oAsn.hasOwnProperty(item))
            oAsn[item] = obj[item];
    });
    var oAsnMng = factory.CreateMng(oAsn);

    Operacion.getFolioByTipo('ASN', (folio) => {
        
        oAsn.Folio = folio;
        TableMng.Action(pool, oAsnMng, 'add', (data) => {
            var lstDoc = [];
            obj.lstDoc.forEach(doc => {
                var oAsn_doc = factory.CreateObj('Asn_documento');
                Object.keys(doc).forEach(item => {
                    if(oAsn_doc.hasOwnProperty(item))
                        oAsn_doc[item] = doc[item];
                });
                oAsn_doc.Id_asn = data[0].id;
                lstDoc.push(oAsn_doc);
            });
            Operacion.addLstAsnDoc(lstDoc, 0, callback, ()=> {
                callback();
            });
        });

    });
}
// Schedule
Operacion.getAsnSchedule = function(callback) {
    TableMng.Select(pool, `select a.id, a.folio title, c.nombre cliente, 
                                concat(a.fecha_arribo, "T", a.hora_arribo) start, 
                                tt.nombre transporte
                            from asn a join cliente c 
                                on c.id = a.id_cliente 
                            join transporte_tipo tt 
                                on tt.id = a.id_transporte_tipo;`, 
                                null, (data => {
        callback(JSON.stringify(data));
    }));    
}

Operacion.getAsnScheduleByCliente = function(cliente, callback) {
    TableMng.Select(pool, `select a.id, a.folio title, c.nombre cliente, 
                                concat(a.fecha_arribo, "T", a.hora_arribo) start, 
                                tt.nombre transporte
                            from asn a join cliente c 
                                on c.id = a.id_cliente 
                                and c.id = ?
                            join transporte_tipo tt 
                                on tt.id = a.id_transporte_tipo;`, 
                                cliente, (data => {
        callback(JSON.stringify(data));
    }));    
}

// Asn_documento
// Add
Operacion.addLstAsnDoc = function(lstAsnDoc, indice, callback, tran = null) {
    var factory = new Factory();
    var oAsn_doc = lstAsnDoc[indice];
    if(oAsn_doc) {
        var oAsn_docMng = factory.CreateMng(oAsn_doc);
        indice++;
        TableMng.Action(pool, oAsn_docMng, 'add', (data) => {
            Operacion.addLstAsnDoc(lstAsnDoc, indice, callback);
        });
    }
    else
        callback();
}

module.exports = Operacion;