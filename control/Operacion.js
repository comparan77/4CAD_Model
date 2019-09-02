var Factory = require('../model/Factory.js');

function Operacion () {};

// Asn 
// Add
Operacion.addAsn = function(obj, callback) {

    var factory = new Factory();
    var oAsn = factory.CreateObj('Asn');
    var oAsn_doc = factory.CreateObj('Asn_documento');

    Object.keys(obj).forEach(item => {
        console.log(item);
    })

    var oAsnMng = factory.CreateMng(oAsn);
    var oAsn_docMng = factory.CreateMng(oAsn_doc);

    callback(obj);

    // oTMng.Action('lst', (data) => {
    //   callback(JSON.stringify(data));
    // })
}

module.exports = Operacion;