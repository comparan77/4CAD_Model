var BaseMng = require('../_common/basemng.js');

function Almacen_tipo_codificacionMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen_tipo_codificacion', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
	}

	this.QrySelBy = 'select Id, Nombre FROM almacen_tipo_codificacion WHERE ';

};
Almacen_tipo_codificacionMng.prototype = Object.create(BaseMng.prototype);
Almacen_tipo_codificacionMng.prototype.constructor = Almacen_tipo_codificacionMng;
Almacen_tipo_codificacionMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
}
module.exports = Almacen_tipo_codificacionMng;