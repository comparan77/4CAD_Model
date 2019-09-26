var BaseMng = require('../_common/basemng.js');

function Almacen_zonaMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen_zona', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_almacen: 0,
		Clave: '',
		Nombre: '',
	}

	this.QrySelBy = 'select Id, Id_almacen, Clave, Nombre FROM almacen_zona WHERE ';

};
Almacen_zonaMng.prototype = Object.create(BaseMng.prototype);
Almacen_zonaMng.prototype.constructor = Almacen_zonaMng;
Almacen_zonaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_almacen = this.obj.Id_almacen == null ? this.Params.Id_almacen : this.obj.Id_almacen;
	this.Params.Clave = this.obj.Clave == null ? this.Params.Clave : this.obj.Clave;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
}
module.exports = Almacen_zonaMng;