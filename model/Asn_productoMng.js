var BaseMng = require('../_common/basemng.js');

function Asn_productoMng (o, lst = null) {
	BaseMng.call(this, o, 'asn_producto', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_asn: 0,
		Id_vendor_producto: 0,
		Pieza_declarada: 0,
	}

	this.QrySelBy = 'select Id, Id_asn, Id_vendor_producto, Pieza_declarada FROM asn_producto WHERE ';

};
Asn_productoMng.prototype = Object.create(BaseMng.prototype);
Asn_productoMng.prototype.constructor = Asn_productoMng;
Asn_productoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_asn = this.obj.Id_asn == null ? this.Params.Id_asn : this.obj.Id_asn;
	this.Params.Id_vendor_producto = this.obj.Id_vendor_producto == null ? this.Params.Id_vendor_producto : this.obj.Id_vendor_producto;
	this.Params.Pieza_declarada = this.obj.Pieza_declarada == null ? this.Params.Pieza_declarada : this.obj.Pieza_declarada;
}
module.exports = Asn_productoMng;