var BaseMng = require('../_common/basemng.js');

function AsnMng (o, lst = null) {
	BaseMng.call(this, o, 'asn', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Folio: '',
		Id_cliente: 0,
		Fecha_arribo: '',
		Hora_arribo: '',
		Id_mercancia_vendor: 0,
		Bulto_declarado: 0,
		Pieza_declarada: 0,
		Operador: '',
		Sello: '',
		Id_transporte_linea: 0,
		Id_transporte_tipo: 0,
		Placa: '',
		Caja: '',
		Cont_1: '',
		Cont_2: '',
	}
};
AsnMng.prototype = Object.create(BaseMng.prototype);
AsnMng.prototype.constructor = AsnMng;
AsnMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Folio = this.obj.Folio == null ? this.Params.Folio : this.obj.Folio;
	this.Params.Id_cliente = this.obj.Id_cliente == null ? this.Params.Id_cliente : this.obj.Id_cliente;
	this.Params.Fecha_arribo = this.obj.Fecha_arribo == null ? this.Params.Fecha_arribo : this.obj.Fecha_arribo;
	this.Params.Hora_arribo = this.obj.Hora_arribo == null ? this.Params.Hora_arribo : this.obj.Hora_arribo;
	this.Params.Id_mercancia_vendor = this.obj.Id_mercancia_vendor == null ? this.Params.Id_mercancia_vendor : this.obj.Id_mercancia_vendor;
	this.Params.Bulto_declarado = this.obj.Bulto_declarado == null ? this.Params.Bulto_declarado : this.obj.Bulto_declarado;
	this.Params.Pieza_declarada = this.obj.Pieza_declarada == null ? this.Params.Pieza_declarada : this.obj.Pieza_declarada;
	this.Params.Operador = this.obj.Operador == null ? this.Params.Operador : this.obj.Operador;
	this.Params.Sello = this.obj.Sello == null ? this.Params.Sello : this.obj.Sello;
	this.Params.Id_transporte_linea = this.obj.Id_transporte_linea == null ? this.Params.Id_transporte_linea : this.obj.Id_transporte_linea;
	this.Params.Id_transporte_tipo = this.obj.Id_transporte_tipo == null ? this.Params.Id_transporte_tipo : this.obj.Id_transporte_tipo;
	this.Params.Placa = this.obj.Placa == null ? this.Params.Placa : this.obj.Placa;
	this.Params.Caja = this.obj.Caja == null ? this.Params.Caja : this.obj.Caja;
	this.Params.Cont_1 = this.obj.Cont_1 == null ? this.Params.Cont_1 : this.obj.Cont_1;
	this.Params.Cont_2 = this.obj.Cont_2 == null ? this.Params.Cont_2 : this.obj.Cont_2;
}
module.exports = AsnMng;