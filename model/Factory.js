var Aduana = require('./Aduana.js');
var AduanaMng = require('./AduanaMng.js');

var Almacen = require('./Almacen.js');
var AlmacenMng = require('./AlmacenMng.js');

var Almacen_codificacion = require('./Almacen_codificacion.js');
var Almacen_codificacionMng = require('./Almacen_codificacionMng.js');

var Almacen_layout = require('./Almacen_layout.js');
var Almacen_layoutMng = require('./Almacen_layoutMng.js');

var Almacen_plantilla = require('./Almacen_plantilla.js');
var Almacen_plantillaMng = require('./Almacen_plantillaMng.js');

var Almacen_tipo_codificacion = require('./Almacen_tipo_codificacion.js');
var Almacen_tipo_codificacionMng = require('./Almacen_tipo_codificacionMng.js');

var Almacen_ubicacion = require('./Almacen_ubicacion.js');
var Almacen_ubicacionMng = require('./Almacen_ubicacionMng.js');

var Almacen_zona = require('./Almacen_zona.js');
var Almacen_zonaMng = require('./Almacen_zonaMng.js');

var Asn = require('./Asn.js');
var AsnMng = require('./AsnMng.js');

var Asn_documento = require('./Asn_documento.js');
var Asn_documentoMng = require('./Asn_documentoMng.js');

var Asn_producto = require('./Asn_producto.js');
var Asn_productoMng = require('./Asn_productoMng.js');

var Cliente = require('./Cliente.js');
var ClienteMng = require('./ClienteMng.js');

var Documento = require('./Documento.js');
var DocumentoMng = require('./DocumentoMng.js');

var Entrada = require('./Entrada.js');
var EntradaMng = require('./EntradaMng.js');

var Entrada_producto = require('./Entrada_producto.js');
var Entrada_productoMng = require('./Entrada_productoMng.js');

var Entrada_producto_referencia = require('./Entrada_producto_referencia.js');
var Entrada_producto_referenciaMng = require('./Entrada_producto_referenciaMng.js');

var Entrada_producto_ubicacion = require('./Entrada_producto_ubicacion.js');
var Entrada_producto_ubicacionMng = require('./Entrada_producto_ubicacionMng.js');

var Folio = require('./Folio.js');
var FolioMng = require('./FolioMng.js');

var Transporte_linea = require('./Transporte_linea.js');
var Transporte_lineaMng = require('./Transporte_lineaMng.js');

var Transporte_linea_tipo = require('./Transporte_linea_tipo.js');
var Transporte_linea_tipoMng = require('./Transporte_linea_tipoMng.js');

var Transporte_tipo = require('./Transporte_tipo.js');
var Transporte_tipoMng = require('./Transporte_tipoMng.js');

var Vendor = require('./Vendor.js');
var VendorMng = require('./VendorMng.js');

var Vendor_producto = require('./Vendor_producto.js');
var Vendor_productoMng = require('./Vendor_productoMng.js');

function Factory() {
	this.CreateObj = function(type) {
		var o;
		switch (type) {

			case 'Aduana':
				o = new Aduana();
				break;
			case 'Almacen':
				o = new Almacen();
				break;
			case 'Almacen_codificacion':
				o = new Almacen_codificacion();
				break;
			case 'Almacen_layout':
				o = new Almacen_layout();
				break;
			case 'Almacen_plantilla':
				o = new Almacen_plantilla();
				break;
			case 'Almacen_tipo_codificacion':
				o = new Almacen_tipo_codificacion();
				break;
			case 'Almacen_ubicacion':
				o = new Almacen_ubicacion();
				break;
			case 'Almacen_zona':
				o = new Almacen_zona();
				break;
			case 'Asn':
				o = new Asn();
				break;
			case 'Asn_documento':
				o = new Asn_documento();
				break;
			case 'Asn_producto':
				o = new Asn_producto();
				break;
			case 'Cliente':
				o = new Cliente();
				break;
			case 'Documento':
				o = new Documento();
				break;
			case 'Entrada':
				o = new Entrada();
				break;
			case 'Entrada_producto':
				o = new Entrada_producto();
				break;
			case 'Entrada_producto_referencia':
				o = new Entrada_producto_referencia();
				break;
			case 'Entrada_producto_ubicacion':
				o = new Entrada_producto_ubicacion();
				break;
			case 'Folio':
				o = new Folio();
				break;
			case 'Transporte_linea':
				o = new Transporte_linea();
				break;
			case 'Transporte_linea_tipo':
				o = new Transporte_linea_tipo();
				break;
			case 'Transporte_tipo':
				o = new Transporte_tipo();
				break;
			case 'Vendor':
				o = new Vendor();
				break;
			case 'Vendor_producto':
				o = new Vendor_producto();
				break;
		}
		o.type = type;
		return o;
	}
	this.CreateMng = function(o) {
		var oMng;
		switch (o.type) {

			case 'Aduana':
				oMng = new AduanaMng(o);
				break;
			case 'Almacen':
				oMng = new AlmacenMng(o);
				break;
			case 'Almacen_codificacion':
				oMng = new Almacen_codificacionMng(o);
				break;
			case 'Almacen_layout':
				oMng = new Almacen_layoutMng(o);
				break;
			case 'Almacen_plantilla':
				oMng = new Almacen_plantillaMng(o);
				break;
			case 'Almacen_tipo_codificacion':
				oMng = new Almacen_tipo_codificacionMng(o);
				break;
			case 'Almacen_ubicacion':
				oMng = new Almacen_ubicacionMng(o);
				break;
			case 'Almacen_zona':
				oMng = new Almacen_zonaMng(o);
				break;
			case 'Asn':
				oMng = new AsnMng(o);
				break;
			case 'Asn_documento':
				oMng = new Asn_documentoMng(o);
				break;
			case 'Asn_producto':
				oMng = new Asn_productoMng(o);
				break;
			case 'Cliente':
				oMng = new ClienteMng(o);
				break;
			case 'Documento':
				oMng = new DocumentoMng(o);
				break;
			case 'Entrada':
				oMng = new EntradaMng(o);
				break;
			case 'Entrada_producto':
				oMng = new Entrada_productoMng(o);
				break;
			case 'Entrada_producto_referencia':
				oMng = new Entrada_producto_referenciaMng(o);
				break;
			case 'Entrada_producto_ubicacion':
				oMng = new Entrada_producto_ubicacionMng(o);
				break;
			case 'Folio':
				oMng = new FolioMng(o);
				break;
			case 'Transporte_linea':
				oMng = new Transporte_lineaMng(o);
				break;
			case 'Transporte_linea_tipo':
				oMng = new Transporte_linea_tipoMng(o);
				break;
			case 'Transporte_tipo':
				oMng = new Transporte_tipoMng(o);
				break;
			case 'Vendor':
				oMng = new VendorMng(o);
				break;
			case 'Vendor_producto':
				oMng = new Vendor_productoMng(o);
				break;
		}
		return oMng;
	}
};
module.exports = Factory;