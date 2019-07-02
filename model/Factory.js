var pool = require('../_common/db.js');
var TableMng = require('../_common/TableMng.js');

var Cliente = require('./Cliente.js');
var ClienteMng = require('./ClienteMng.js');

var Aduana = require('./Aduana.js');
var AduanaMng = require('./AduanaMng.js');

var Transporte_tipo = require('./Transporte_tipo.js');
var Transporte_tipoMng = require('./Transporte_tipoMng.js');

var Transporte_linea = require('./Transporte_linea.js');
var Transporte_lineaMng = require('./Transporte_lineaMng.js');

// var o = new Cliente();
// o.Id = 1;
// o.Nombre = 'Cliente Uno';
// // o.Codigo = '23';
// var oMgn = new ClienteMng(o);
// var oMng = new TableMng({
//     objMng: oMgn,
//     pool: pool
// });

function Factory() {
    this.CreateObj = function(type) {
        var o;
        
        if (type === "Aduana") {
            o = new Aduana();
        } else if (type === "Cliente") {
            o = new Cliente();
        } else if (type === "Transporte_tipo") {
            o = new Transporte_tipo();
        } else if (type === "Transporte_linea") {
            o = new Transporte_linea();
        }
        
        o.type = type;

        return o;
    }

    this.CreateMng = function(o) {
        var oMng;
        var oTMng;

        if(o.type === "Aduana") {
            oMng = new AduanaMng(o)
        } else if (o.type === "Cliente") {
            oMng = new ClienteMng(o)
        } else if (o.type === "Transporte_tipo") {
            oMng = new Transporte_tipoMng(o)
        } else if (o.type === "Transporte_linea") {
            oMng = new Transporte_lineaMng(o)
        }

        oTMng = new TableMng({
            objMng: oMng,
            pool: pool
        })
        return oTMng;
    }
};

module.exports = Factory;