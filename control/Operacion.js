var pool = require('../_common/db.js');
var TableMng = require('../_common/TableMng.js');
var Factory = require('../model/Factory.js');

function Operacion () {};

// Asn 
// Add
Operacion.addAsn = function(obj, callback) {

    var factory = new Factory();
    var oAsn = factory.CreateObj('Asn');
    var oAsn_doc = factory.CreateObj('Asn_documento');

    Object.keys(obj).forEach(item => {
        if(oAsn.hasOwnProperty(item))
            oAsn[item] = obj[item];
    });
    var oAsnMng = factory.CreateMng(oAsn);

    TableMng.Action(pool, oAsnMng, 'add', (data) => {
        obj.lstDoc.forEach(doc => {
            Object.keys(doc).forEach(item => {
                if(oAsn_doc.hasOwnProperty(item))
                    oAsn_doc[item] = doc[item];
            });
            oAsn_doc.Id_asn = data[0].id;
            var oAsn_docMng = factory.CreateMng(oAsn_doc);
            
        });
    });

    // var oAsn_docMng = factory.CreateMng(oAsn_doc);
    

    // var oAsnMng = factory.CreateMng(oAsn);
    // var oAsn_docMng = factory.CreateMng(oAsn_doc);
    // console.log(JSON.stringify(oAsn));
    // console.log(JSON.stringify(oAsn_doc));
    
    callback(oAsn);

    // oTMng.Action('lst', (data) => {
    //   callback(JSON.stringify(data));
    // })
}

module.exports = Operacion;