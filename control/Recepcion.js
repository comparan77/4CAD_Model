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
                Recepcion.asnLstDocAdd(lstDoc, 0, ()=> {
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
        Recepcion.asnLstDocAdd(lstDoc, 0, ()=> {
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
Recepcion.asnLstDocAdd = function(lstAsnDoc, indice, callback, tran = null) {
    var factory = new Factory();
    var oAsn_doc = lstAsnDoc[indice];
    if(oAsn_doc) {
        var oAsn_docMng = factory.CreateMng(oAsn_doc);
        indice++;
        TableMng.Action(pool, oAsn_docMng, 'add', (data) => {
            Recepcion.asnLstDocAdd(lstAsnDoc, indice, callback);
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

Recepcion.asnSelloSearch = function(sello, callback) {
    var factory = new Factory();
    var oAsn = factory.CreateObj('Asn');
    var oAsnMng = factory.CreateMng(oAsn);

    TableMng.SelectBy(pool, oAsnMng, 'sello_cte_dt = ?', sello, (res)=> {
        if(oAsn.Id > 0) {
            var oAsnDoc = factory.CreateObj('Asn_documento');
            var oAsnDocMng = factory.CreateMng(oAsnDoc);
            TableMng.SelectBy(pool, oAsnDocMng, 'id_asn = ?', oAsn.Id, (res)=> {
                oAsn.Documento = res;
                callback(oAsn);
            })
        }
        else
            callback(res);
    });
}

// Schedule
Recepcion.asnGetSchedule = function(callback) {
    TableMng.Execute(pool, `select a.id, a.folio title, c.nombre cliente, 
                                concat(a.fecha_arribo, "T", a.hora_arribo) start, 
                                tt.nombre transporte
                            from asn a join cliente c 
                                on c.id = a.id_cliente 
                            join transporte_tipo tt 
                                on tt.id = a.id_transporte_tipo;`, 
                                null, (data => {
        callback(data);
    }));    
}

Recepcion.asnGetScheduleByCliente = function(cliente, callback) {
    TableMng.Execute(pool, `select a.id, a.folio title, c.nombre cliente, 
                                concat(a.fecha_arribo, "T", a.hora_arribo) start, 
                                tt.nombre transporte
                            from asn a join cliente c 
                                on c.id = a.id_cliente 
                                and c.id = ?
                            join transporte_tipo tt 
                                on tt.id = a.id_transporte_tipo;`, 
                                cliente, (data => {
        callback(data);
    }));    
}

// Cortinas con recepcion
Recepcion.asnGetRecepcionCortina = function(callback) {
    TableMng.Execute(pool, `select a.nombre almacen, c.id_almacen, count(c.id) cortinas, 
    count(ar.id) operacion from cortina c join almacen a on a.id = c.id_almacen  
    left join asn_recepcion ar 
    on ar.id_cortina = c.id and ar.en_operacion = 1
    group by c.id_almacen;`, null, (data => {
        callback(data);
    }))
}

Recepcion.asnGetRecepcionCortinaByAlmacen = function(almacen, callback) {
    TableMng.Execute(pool, `select
                    a.nombre almacen
                    ,c.nombre cortina
                    ,c.id id_cortina
                    , COALESCE(asn_r.id, 0) asn_r_id 
                    , COALESCE(asn.folio, '') a_folio
                from cortina c
                join almacen a on 
                    c.id_almacen = a.id
                    and a.id = ?
                left join asn_recepcion asn_r on
                    asn_r.id_cortina = c.id
                    and asn_r.en_operacion = 1
                left join asn asn on
                    asn.id = asn_r.id_asn
                order by c.id;`, 
                                almacen, (data => {
        callback(data);
    }));
}

Recepcion.asnGetRecepcionCortinaById= function(id, callback) {

    TableMng.Execute(pool, `select
                a.id id_asn,
                a.folio,
                c.nombre cliente,
                v.nombre vendor,
                vm.nombre producto,
                a.caja_declarada,
                a.pieza_declarada,
                a.operador,
                a.sello,
                tl.nombre linea,
                tt.nombre tipo,
                a.placa,
                a.caja,
                a.cont_1,
                a.cont_2,
                asn_r.fecha_recepcion,
                asn_r.hora_recepcion
            from asn_recepcion asn_r
            join asn a on 
                a.id = asn_r.id_asn
            join cliente c on
                c.id = a.id_cliente
            join vendor_producto vm on
                vm.id = a.id_vendor_producto
            join vendor v on	
                v.id = vm.id_vendor
            join transporte_linea tl on
                tl.id = a.id_transporte_linea
            join transporte_tipo tt on
                tt.id = a.id_transporte_tipo
            where asn_r.id = ?;`, 
                                id, (data => {
        Operacion.asnSltByDoc(data[0].id_asn, (res) => {
            data[0].lstDoc = res;
            callback(data);
        });
    }));
}

// Select by Asn
Recepcion.asnSltByDoc = function(id_asn, callback, tran = null) {
    var factory = new Factory();
    var oAsn_doc = factory.CreateObj('Asn_documento');
    var oAsn_docMng = factory.CreateMng(oAsn_doc);
    
    TableMng.SelectBy(pool, oAsn_docMng, `id_asn = ?`, id_asn, (res) => {
        Catalogo.lstCatalogo('Documento', (data) => {
            for(i in res) {
                var doc = data.find((obj) => {
                    return obj.Id == res[i].Id_documento;
                });
                res[i].Documento = doc.Nombre;
            }
            if(callback) callback(res);
        });
        
    });
}

Recepcion.recibidosGet = function(callback) {
    TableMng.Execute(pool, 
        `
SELECT 
	e.Id Id_entrada
    ,e.folio Folio
    ,e.cliente Cliente
    ,e.producto Producto
    ,u.u_a UAlm
    ,u.todos Cantidad
	,u.ubicados Ubicados
	,u.pendientes Pendientes
FROM
	entrada e
JOIN (
	
SELECT
	 ep.id_entrada
	,ua.nombre u_a
	,count(ep.id) todos
	,count(epu.id) ubicados
	,count(ep.id) - count(epu.id) pendientes
FROM entrada_producto ep 
JOIN unidad_almacenamiento ua ON
    ua.id = ep.id_unidad_almacenamiento
LEFT JOIN entrada_producto_ubicacion epu ON
	ep.id = epu.id_entrada_producto
having count(ep.id) - count(epu.id) != 0 ) u ON
	u.id_entrada = e.id;
        `, '', (data) => {
            callback(data);
        })
}

module.exports = Recepcion;