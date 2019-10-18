var BaseMng = require('../_common/basemng.js');

function Entrada_producto_referenciaMng (o, lst = null) {
	BaseMng.call(this, o, 'entrada_producto_referencia', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_entrada_producto: 0,
		Id_producto_referencia: 0,
		Referencia: '',
	}

	this.QrySelBy = 'select Id, Id_entrada_producto, Id_producto_referencia, Referencia FROM entrada_producto_referencia WHERE ';

};
Entrada_producto_referenciaMng.prototype = Object.create(BaseMng.prototype);
Entrada_producto_referenciaMng.prototype.constructor = Entrada_producto_referenciaMng;
Entrada_producto_referenciaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_entrada_producto = this.obj.Id_entrada_producto == null ? this.Params.Id_entrada_producto : this.obj.Id_entrada_producto;
	this.Params.Id_producto_referencia = this.obj.Id_producto_referencia == null ? this.Params.Id_producto_referencia : this.obj.Id_producto_referencia;
	this.Params.Referencia = this.obj.Referencia == null ? this.Params.Referencia : this.obj.Referencia;
}
module.exports = Entrada_producto_referenciaMng;