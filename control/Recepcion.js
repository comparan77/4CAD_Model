//Pendiente asn compartida para la tabla asn_producto_detalle como en la linea 55

var Operacion = require('./Operacion.js')
var pool = require('../_common/db.js');
var Catalogo = require('./Catalogo.js')
var TableMng = require('../_common/TableMng.js');
var Factory = require('../model/Factory.js');

function Recepcion () {};

Recepcion.asn_producto_detalle_by_cte = function(id_cte, callback) {
    TableMng.Execute(pool, 'show columns from asn_producto_detalle_' + id_cte, null, function(data) {
        callback(data);        
    }, function(err) {
        callback(null)
    });
}

// Asn 
// Add
Recepcion.asn_Add = function(obj, callback) {

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

            obj.Producto.Id_asn = oAsn.Id;
            Recepcion.asn_producto_Add(obj.Producto, (oAP) => {

                // Inicio
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
                Recepcion.AsnLstDocAdd(lstDoc, 0, ()=> {
                    //Agregar producto detalle para las cuentas configuradas
                    if(obj.Producto.Csv_file_detail_prod.name!='') {
                        //Insertar detalle de productos de la cuenta configurada
                        Recepcion.productoDetalleAdd(obj.Producto.Csv_file_detail_prod.name, oAsn.Id_cliente, obj.Producto.Csv_file_detail_prod.head, oAP.Id, ()=> {
                            callback();    
                        } )
                    } else {
                        callback();
                    }
                    
                });
                // Fin

            })

        });

    });
}

// Asn Compartida
Recepcion.asnShare_Add = function(obj, callback) {
    Recepcion.asn_producto_Add(obj.Producto, () => {
                
        // Inicio
        var lstDoc = [];
        if(obj.lstDoc.length > 0)
            var factory = new Factory();
        obj.lstDoc.forEach(doc => {
            var oAsn_doc = factory.CreateObj('Asn_documento');
            Object.keys(doc).forEach(item => {
                if(oAsn_doc.hasOwnProperty(item))
                    oAsn_doc[item] = doc[item];
            });
            lstDoc.push(oAsn_doc);
        });
        Recepcion.AsnLstDocAdd(lstDoc, 0, ()=> {
            callback();
        });
        // Fin

    })
}

// Asn_producto
// Add
Recepcion.asn_producto_Add = function(obj, callback) {
    var factory = new Factory();
    var oAP = factory.CreateObj('Asn_producto');
    var oAP_Mng = factory.CreateMng(oAP);
    
    TableMng.cloneObj(oAP, obj);
    TableMng.Action(pool, oAP_Mng, 'add', () => {
        if(callback) callback(oAP);
    })
}

// Asn_documento
// Add
Recepcion.AsnLstDocAdd = function(lstAsnDoc, indice, callback, tran = null) {
    var factory = new Factory();
    var oAsn_doc = lstAsnDoc[indice];
    if(oAsn_doc) {
        var oAsn_docMng = factory.CreateMng(oAsn_doc);
        indice++;
        TableMng.Action(pool, oAsn_docMng, 'add', (data) => {
            Recepcion.AsnLstDocAdd(lstAsnDoc, indice, callback);
        });
    }
    else
        callback();
}

Recepcion.productoDetalleAdd = function(fileName, id_cliente, header, id_asn_producto, callback, tran = null) {

    var tblName = 'asn_producto_detalle_' + id_cliente;

    var colNames = '(';
    
    console.log(header.length);
    for(h in header) {
        colNames += header[h];
        if(h < header.length -1)
            colNames += ','
    }
    colNames+= ')';

    var qry = `LOAD DATA LOCAL INFILE '` + fileName + `'
    INTO TABLE ` + tblName + `
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' 
    LINES TERMINATED BY '\\r\\n'
    IGNORE 1 LINES 
    ` + colNames + `
    SET id_asn_producto = ?;`;

    // console.log(qry);
    TableMng.Execute(pool, qry, id_asn_producto, ()=> {
        callback();
    })
}

module.exports = Recepcion;