var BaseMng = require('../_common/basemng.js');

function Entrada_productoMng (o, lst = null) {
	BaseMng.call(this, o, 'entrada_producto', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_entrada: 0,
		Id_producto_metodo: 0,
		Id_producto_formato: 0,
		Id_almacen_rotacion: 0,
		Folio: '',
		Cajas: 0,
		Piezas: 0,
	}

	this.QrySelBy = 'select Id, Id_entrada, Id_producto_metodo, Id_producto_formato, Id_almacen_rotacion, Folio, Cajas, Piezas FROM entrada_producto WHERE ';

};
Entrada_productoMng.prototype = Object.create(BaseMng.prototype);
Entrada_productoMng.prototype.constructor = Entrada_productoMng;
Entrada_productoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_entrada = this.obj.Id_entrada == null ? this.Params.Id_entrada : this.obj.Id_entrada;
	this.Params.Id_producto_metodo = this.obj.Id_producto_metodo == null ? this.Params.Id_producto_metodo : this.obj.Id_producto_metodo;
	this.Params.Id_producto_formato = this.obj.Id_producto_formato == null ? this.Params.Id_producto_formato : this.obj.Id_producto_formato;
	this.Params.Id_almacen_rotacion = this.obj.Id_almacen_rotacion == null ? this.Params.Id_almacen_rotacion : this.obj.Id_almacen_rotacion;
	this.Params.Folio = this.obj.Folio == null ? this.Params.Folio : this.obj.Folio;
	this.Params.Cajas = this.obj.Cajas == null ? this.Params.Cajas : this.obj.Cajas;
	this.Params.Piezas = this.obj.Piezas == null ? this.Params.Piezas : this.obj.Piezas;
}
module.exports = Entrada_productoMng;