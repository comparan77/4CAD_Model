var BaseMng = require('../_common/basemng.js');

function VendorMng (o, lst = null) {
	BaseMng.call(this, o, 'vendor', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
	}
};
VendorMng.prototype = Object.create(BaseMng.prototype);
VendorMng.prototype.constructor = VendorMng;
VendorMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
}
module.exports = VendorMng;