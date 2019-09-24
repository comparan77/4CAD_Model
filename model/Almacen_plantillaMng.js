var BaseMng = require('../_common/basemng.js');

function Almacen_plantillaMng (o, lst = null) {
	BaseMng.call(this, o, 'almacen_plantilla', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_almacen: 0,
		Id_tipo_ubicacion: 0,
		Id_tipo_codificacion: 0,
	}

	this.QrySelBy = 'select Id, Id_almacen, Id_tipo_ubicacion, Id_tipo_codificacion FROM almacen_plantilla WHERE ';

};
Almacen_plantillaMng.prototype = Object.create(BaseMng.prototype);
Almacen_plantillaMng.prototype.constructor = Almacen_plantillaMng;
Almacen_plantillaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_almacen = this.obj.Id_almacen == null ? this.Params.Id_almacen : this.obj.Id_almacen;
	this.Params.Id_tipo_ubicacion = this.obj.Id_tipo_ubicacion == null ? this.Params.Id_tipo_ubicacion : this.obj.Id_tipo_ubicacion;
	this.Params.Id_tipo_codificacion = this.obj.Id_tipo_codificacion == null ? this.Params.Id_tipo_codificacion : this.obj.Id_tipo_codificacion;
}
module.exports = Almacen_plantillaMng;