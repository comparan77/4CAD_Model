var BaseMng = require('../_common/basemng.js');

function Vendor_mercanciaMng (o, lst = null) {
	BaseMng.call(this, o, 'vendor_mercancia', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_vendor: 0,
		Nombre: '',
	}
};
Vendor_mercanciaMng.prototype = Object.create(BaseMng.prototype);
Vendor_mercanciaMng.prototype.constructor = Vendor_mercanciaMng;
Vendor_mercanciaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id;
	this.Params.Id_vendor = this.obj.Id_vendor;
	this.Params.Nombre = this.obj.Nombre;
}
module.exports = Vendor_mercanciaMng;