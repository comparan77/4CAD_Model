var BaseMng = require('../_common/basemng.js');

function Transporte_tipoMng (o, lst = null) {
	BaseMng.call(this, o, 'transporte_tipo', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
		Peso_max: 0,
		Placa: false,
		Caja: false,
		Cont_1: false,
		Cont_2: false,
	}
};
Transporte_tipoMng.prototype = Object.create(BaseMng.prototype);
Transporte_tipoMng.prototype.constructor = Transporte_tipoMng;
Transporte_tipoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
	this.Params.Peso_max = this.obj.Peso_max == null ? this.Params.Peso_max : this.obj.Peso_max;
	this.Params.Placa = this.obj.Placa == null ? this.Params.Placa : this.obj.Placa;
	this.Params.Caja = this.obj.Caja == null ? this.Params.Caja : this.obj.Caja;
	this.Params.Cont_1 = this.obj.Cont_1 == null ? this.Params.Cont_1 : this.obj.Cont_1;
	this.Params.Cont_2 = this.obj.Cont_2 == null ? this.Params.Cont_2 : this.obj.Cont_2;
}
module.exports = Transporte_tipoMng;