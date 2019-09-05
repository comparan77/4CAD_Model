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
Operacion.folioGetByTipo = function(tipo, callback) {

    var factory = new Factory();
    var oFolio = factory.CreateObj('Folio');
    var oFolioMng = factory.CreateMng(oFolio);
    var _data;

    TableMng.SelectBy(pool, oFolioMng, `tipo = ?`, tipo, (data) => {
        _data = data;
        Operacion.getAnioActFromDB((data) => {
            if(data[0].YearDb != _data[0].Anio_actual)
                console.log('Actualizar año')
            oFolio.Actual = 'ASN-00001-19';
            
            callback(_data);
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