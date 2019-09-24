var BaseMng = require('../_common/basemng.js');

function Almacen_codificacionMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen_codificacion', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_tipo_codificacion: 0,
		Nombre: '',
		Digitos: '',
		Nivel: 0,
	}

	this.QrySelBy = 'select Id, Id_tipo_codificacion, Nombre, Digitos, Nivel FROM almacen_codificacion WHERE ';

};
Almacen_codificacionMng.prototype = Object.create(BaseMng.prototype);
Almacen_codificacionMng.prototype.constructor = Almacen_codificacionMng;
Almacen_codificacionMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_tipo_codificacion = this.obj.Id_tipo_codificacion == null ? this.Params.Id_tipo_codificacion : this.obj.Id_tipo_codificacion;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
	this.Params.Digitos = this.obj.Digitos == null ? this.Params.Digitos : this.obj.Digitos;
	this.Params.Nivel = this.obj.Nivel == null ? this.Params.Nivel : this.obj.Nivel;
}
module.exports = Almacen_codificacionMng;