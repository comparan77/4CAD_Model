var Cliente = require('./Cliente.js');
var ClienteMng = require('./ClienteMng.js');

var Aduana = require('./Aduana.js');
var AduanaMng = require('./AduanaMng.js');

var Transporte_tipo = require('./Transporte_tipo.js');
var Transporte_tipoMng = require('./Transporte_tipoMng.js');

var Transporte_linea = require('./Transporte_linea.js');
var Transporte_lineaMng = require('./Transporte_lineaMng.js');

var Transporte_linea_tipo = require('./Transporte_linea_tipo.js');
var Transporte_linea_tipoMng = require('./Transporte_linea_tipoMng.js');

var Vendor = require('./Vendor.js');
var VendorMng = require('./VendorMng.js');

var Vendor_mercancia = require('./Vendor_mercancia.js');
var Vendor_mercanciaMng = require('./Vendor_mercanciaMng.js');

var Documento = require('./Documento.js');
var DocumentoMng = require('./DocumentoMng.js');

var Asn = require('./Asn.js');
var AsnMng = require('./AsnMng.js');

var Asn_documento = require('./Asn_documento.js');
var Asn_documentoMng = require('./Asn_documentoMng.js');

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
        } else if (type === "Vendor") {
            o = new Vendor();
        } else if (type === "Vendor_mercancia") {
            o = new Vendor_mercancia();
        } else if (type === "Documento") {
            o = new Documento();
        } else if (type === "Transporte_linea_tipo") {
            o = new Transporte_linea_tipo();
        } else if (type === "Asn") {
            o = new Asn();
        } else if (type === "Asn_documento") {
            o = new Asn_documento();
        }

        o.type = type;
        return o;
    }

    this.CreateMng = function(o) {
        var oMng;
        // var oTMng;
        if(o.type === "Aduana") {
            oMng = new AduanaMng(o)
        } else if (o.type === "Cliente") {
            oMng = new ClienteMng(o)
        } else if (o.type === "Transporte_tipo") {
            oMng = new Transporte_tipoMng(o)
        } else if (o.type === "Transporte_linea") {
            oMng = new Transporte_lineaMng(o)
        } else if (o.type === "Vendor") {
            oMng = new VendorMng(o)
        } else if (o.type === "Vendor_mercancia") {
            oMng = new Vendor_mercanciaMng(o)
        } else if (o.type === "Documento") {
            oMng = new DocumentoMng(o)
        } else if (o.type === "Transporte_linea_tipo") {
            oMng = new Transporte_linea_tipoMng(o)
        } else if (o.type === "Asn") {
            oMng = new AsnMng(o)
        } else if (o.type === "Asn_documento") {
            oMng = new Asn_documentoMng(o)
        }

        return oMng;
    }
};

module.exports = Factory;
