var BaseMng = require('../_common/basemng.js');

function AlmacenMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
		Direccion: '',
	}

	this.QrySelBy = 'select Id, Nombre, Direccion FROM almacen WHERE ';

};
AlmacenMng.prototype = Object.create(BaseMng.prototype);
AlmacenMng.prototype.constructor = AlmacenMng;
AlmacenMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
	this.Params.Direccion = this.obj.Direccion == null ? this.Params.Direccion : this.obj.Direccion;
}
module.exports = AlmacenMng;