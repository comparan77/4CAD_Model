var BaseMng = require('../_common/basemng.js');

function TransporteTipoMng (o, lst = null) {
	BaseMng.call(this, o, 'TransporteTipo', lst);

	this.Params = {
		Option: 0,
		TransporteTipoId: 0,
		TransporteTipoNombre: '',
		TransporteTipoPesoMax: 0,
		TransporteTipoPlaca: false,
		TransporteTipoCaja: false,
		TransporteTipoContenedorUno: false,
		TransporteTipoContenedorDos: false,
	}

	this.QrySelBy = 'select TransporteTipoId, TransporteTipoNombre, TransporteTipoPesoMax, TransporteTipoPlaca, TransporteTipoCaja, TransporteTipoContenedorUno, TransporteTipoContenedorDos FROM TransporteTipo WHERE ';

};
TransporteTipoMng.prototype = Object.create(BaseMng.prototype);
TransporteTipoMng.prototype.constructor = TransporteTipoMng;
TransporteTipoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.TransporteTipoId = this.obj.TransporteTipoId == null ? this.Params.TransporteTipoId : this.obj.TransporteTipoId;
	this.Params.TransporteTipoNombre = this.obj.TransporteTipoNombre == null ? this.Params.TransporteTipoNombre : this.obj.TransporteTipoNombre;
	this.Params.TransporteTipoPesoMax = this.obj.TransporteTipoPesoMax == null ? this.Params.TransporteTipoPesoMax : this.obj.TransporteTipoPesoMax;
	this.Params.TransporteTipoPlaca = this.obj.TransporteTipoPlaca == null ? this.Params.TransporteTipoPlaca : this.obj.TransporteTipoPlaca;
	this.Params.TransporteTipoCaja = this.obj.TransporteTipoCaja == null ? this.Params.TransporteTipoCaja : this.obj.TransporteTipoCaja;
	this.Params.TransporteTipoContenedorUno = this.obj.TransporteTipoContenedorUno == null ? this.Params.TransporteTipoContenedorUno : this.obj.TransporteTipoContenedorUno;
	this.Params.TransporteTipoContenedorDos = this.obj.TransporteTipoContenedorDos == null ? this.Params.TransporteTipoContenedorDos : this.obj.TransporteTipoContenedorDos;
}
module.exports = TransporteTipoMng;