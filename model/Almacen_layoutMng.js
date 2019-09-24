var BaseMng = require('../_common/basemng.js');

function Almacen_layoutMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen_layout', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_almacen: 0,
		Nombre: '',
		Clave: '',
		Padre: 0,
	}

	this.QrySelBy = 'select Id, Id_almacen, Nombre, Clave, Padre FROM almacen_layout WHERE ';

};
Almacen_layoutMng.prototype = Object.create(BaseMng.prototype);
Almacen_layoutMng.prototype.constructor = Almacen_layoutMng;
Almacen_layoutMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_almacen = this.obj.Id_almacen == null ? this.Params.Id_almacen : this.obj.Id_almacen;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
	this.Params.Clave = this.obj.Clave == null ? this.Params.Clave : this.obj.Clave;
	this.Params.Padre = this.obj.Padre == null ? this.Params.Padre : this.obj.Padre;
}
module.exports = Almacen_layoutMng;