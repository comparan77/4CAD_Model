var BaseMng = require('../_common/basemng.js');

function Entrada_producto_ubicacionMng (o, lst = null) {
	BaseMng.call(this, o, 'entrada_producto_ubicacion', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_entrada: 0,
		Id_entrada_producto: 0,
		Id_almacen_ubicacion: 0,
		Id_almacen_movimiento: 0,
	}

	this.QrySelBy = 'select Id, Id_entrada, Id_entrada_producto, Id_almacen_ubicacion, Id_almacen_movimiento, Fecha_movimiento FROM entrada_producto_ubicacion WHERE ';

};
Entrada_producto_ubicacionMng.prototype = Object.create(BaseMng.prototype);
Entrada_producto_ubicacionMng.prototype.constructor = Entrada_producto_ubicacionMng;
Entrada_producto_ubicacionMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_entrada = this.obj.Id_entrada == null ? this.Params.Id_entrada : this.obj.Id_entrada;
	this.Params.Id_entrada_producto = this.obj.Id_entrada_producto == null ? this.Params.Id_entrada_producto : this.obj.Id_entrada_producto;
	this.Params.Id_almacen_ubicacion = this.obj.Id_almacen_ubicacion == null ? this.Params.Id_almacen_ubicacion : this.obj.Id_almacen_ubicacion;
	this.Params.Id_almacen_movimiento = this.obj.Id_almacen_movimiento == null ? this.Params.Id_almacen_movimiento : this.obj.Id_almacen_movimiento;
}
module.exports = Entrada_producto_ubicacionMng;