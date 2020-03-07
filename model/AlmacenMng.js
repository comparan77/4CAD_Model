var BaseMng = require('../_common/basemng.js');

function AlmacenMng (o, lst = null) {
	BaseMng.call(this, o, 'Almacen', lst);

	this.Params = {
		Option: 0,
		AlmacenId: 0,
		AlmacenNombre: '',
		AlmacenDireccion: '',
	}

	this.QrySelBy = 'select AlmacenId, AlmacenNombre, AlmacenDireccion FROM Almacen WHERE ';

};
AlmacenMng.prototype = Object.create(BaseMng.prototype);
AlmacenMng.prototype.constructor = AlmacenMng;
AlmacenMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.AlmacenId = this.obj.AlmacenId == null ? this.Params.AlmacenId : this.obj.AlmacenId;
	this.Params.AlmacenNombre = this.obj.AlmacenNombre == null ? this.Params.AlmacenNombre : this.obj.AlmacenNombre;
	this.Params.AlmacenDireccion = this.obj.AlmacenDireccion == null ? this.Params.AlmacenDireccion : this.obj.AlmacenDireccion;
}
module.exports = AlmacenMng;