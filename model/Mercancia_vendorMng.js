var BaseMng = require('../_common/basemng.js');

function Mercancia_vendorMng (o, lst = null) {
	BaseMng.call(this, o, 'mercancia_vendor', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
	}
};
Mercancia_vendorMng.prototype = Object.create(BaseMng.prototype);
Mercancia_vendorMng.prototype.constructor = Mercancia_vendorMng;
Mercancia_vendorMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id;
	this.Params.Nombre = this.obj.Nombre;
}
module.exports = Mercancia_vendorMng;