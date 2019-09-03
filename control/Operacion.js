var Factory = require('../model/Factory.js');

function Operacion () {};

// Asn 
// Add
Operacion.addAsn = function(obj, callback) {

    var factory = new Factory();
    var oAsn = factory.CreateObj('Asn');
    var oAsn_doc = factory.CreateObj('Asn_documento');

    Object.keys(oAsn).forEach(item => {
        //console.log(item);
        if(oAsn.hasOwnProperty(item))
            oAsn[item] = obj[item];
    });

    console.log(JSON.stringify(obj.lstDoc));

    // obj.lstDoc.forEach(doc => {
    //     Object.keys(oAsn_doc).forEach(item => {
    //         if(oAsn_doc.hasOwnProperty(item))
    //             oAsn_doc[item] = doc[item];
    //     });
    // });

    var oAsnMng = factory.CreateMng(oAsn);
    var oAsn_docMng = factory.CreateMng(oAsn_doc);
    // console.log(JSON.stringify(oAsn));
    // console.log(JSON.stringify(oAsn_doc));
    console.log('aqui');
    callback(oAsn);

    // oTMng.Action('lst', (data) => {
    //   callback(JSON.stringify(data));
    // })
}

module.exports = Operacion;