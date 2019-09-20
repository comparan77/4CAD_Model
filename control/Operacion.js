var pool = require('../_common/db.js');
var Catalogo = require('./Catalogo.js')
var TableMng = require('../_common/TableMng.js');
var Factory = require('../model/Factory.js');

function Operacion () {};

// Consultas a la base de datos genéricas
// Fecha
Operacion.getAnioActFromDB = function(callback) {
    TableMng.Select(pool, 'select year(now()) YearDb from dual', '', (data) => {
        callback(data);
    })
}

// Folio
// Get By tipo
Operacion.getFolioByTipo = function(tipo, callback) {

    var factory = new Factory();
    var oFolio = factory.CreateObj('Folio');
    var oFolioMng = factory.CreateMng(oFolio);
    var strFolio;

    TableMng.SelectBy(pool, oFolioMng, `tipo = ?`, tipo, () => {
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
        callback(data);
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
        callback(data);
    }));    
}

// Cortinas con recepcion
Operacion.getAsnRecepcionCortina = function(callback) {
    TableMng.Select(pool, `select a.nombre almacen, c.id_almacen, count(c.id) cortinas, 
    count(ar.id) operacion from cortina c join almacen a on a.id = c.id_almacen  
    left join asn_recepcion ar 
    on ar.id_cortina = c.id and ar.en_operacion = 1
    group by c.id_almacen;`, null, (data => {
        callback(data);
    }))
}

Operacion.getAsnRecepcionCortinaByAlmacen = function(almacen, callback) {
    TableMng.Select(pool, `select
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

Operacion.getAsnRecepcionCortinaById= function(id, callback) {

    TableMng.Select(pool, `select
                a.id id_asn,
                a.folio,
                c.nombre cliente,
                v.nombre vendor,
                vm.nombre mercancia,
                a.bulto_declarado,
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
            join vendor_mercancia vm on
                vm.id = a.id_mercancia_vendor
            join vendor v on	
                v.id = vm.id_vendor
            join transporte_linea tl on
                tl.id = a.id_transporte_linea
            join transporte_tipo tt on
                tt.id = a.id_transporte_tipo
            where asn_r.id = ?;`, 
                                id, (data => {
        Operacion.SltByAsnDoc(data[0].id_asn, (res) => {
            data[0].lstDoc = res;
            callback(data);
        });
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
// Select by Asn
Operacion.SltByAsnDoc = function(id_asn, callback, tran = null) {
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

module.exports = Operacion;