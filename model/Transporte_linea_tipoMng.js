var BaseMng = require('../_common/basemng.js');

function Transporte_linea_tipoMng (o, lst = null) {
	BaseMng.call(this, o, 'transporte_linea_tipo', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_transporte_linea: 0,
		Id_transporte_tipo: 0,
	}
};
Transporte_linea_tipoMng.prototype = Object.create(BaseMng.prototype);
Transporte_linea_tipoMng.prototype.constructor = Transporte_linea_tipoMng;
Transporte_linea_tipoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_transporte_linea = this.obj.Id_transporte_linea == null ? this.Params.Id_transporte_linea : this.obj.Id_transporte_linea;
	this.Params.Id_transporte_tipo = this.obj.Id_transporte_tipo == null ? this.Params.Id_transporte_tipo : this.obj.Id_transporte_tipo;
}
module.exports = Transporte_linea_tipoMng;