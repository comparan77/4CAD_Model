var BaseMng = require('../_common/basemng.js');

function Vendor_productoMng (o, lst = null) {
	BaseMng.call(this, o, 'vendor_producto', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_vendor: 0,
		Nombre: '',
	}

	this.QrySelBy = 'select Id, Id_vendor, Nombre FROM vendor_producto WHERE ';

};
Vendor_productoMng.prototype = Object.create(BaseMng.prototype);
Vendor_productoMng.prototype.constructor = Vendor_productoMng;
Vendor_productoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_vendor = this.obj.Id_vendor == null ? this.Params.Id_vendor : this.obj.Id_vendor;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
}
module.exports = Vendor_productoMng;