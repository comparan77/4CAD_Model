var BaseMng = require('../_common/basemng.js');

function Almacen_ubicacionMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen_ubicacion', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_almacen_zona: 0,
		Id_almacen_rotacion: 0,
		Clave: '',
		Nombre: '',
		Referencia: '',
	}

	this.QrySelBy = 'select Id, Id_almacen_zona, Id_almacen_rotacion, Clave, Nombre, Referencia FROM almacen_ubicacion WHERE ';

};
Almacen_ubicacionMng.prototype = Object.create(BaseMng.prototype);
Almacen_ubicacionMng.prototype.constructor = Almacen_ubicacionMng;
Almacen_ubicacionMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_almacen_zona = this.obj.Id_almacen_zona == null ? this.Params.Id_almacen_zona : this.obj.Id_almacen_zona;
	this.Params.Id_almacen_rotacion = this.obj.Id_almacen_rotacion == null ? this.Params.Id_almacen_rotacion : this.obj.Id_almacen_rotacion;
	this.Params.Clave = this.obj.Clave == null ? this.Params.Clave : this.obj.Clave;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
	this.Params.Referencia = this.obj.Referencia == null ? this.Params.Referencia : this.obj.Referencia;
}
module.exports = Almacen_ubicacionMng;