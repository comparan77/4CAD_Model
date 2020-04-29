var BaseMng = require('../_common/basemng.js');

function AsnMng (o, lst = null) {
	BaseMng.call(this, o, 'Asn', lst);

	this.Params = {
		Option: 0,
		AsnId: 0,
		AsnFolio: '',
		ClienteId: 0,
		AlmacenId: 0,
		AsnFechaArribo: '',
		AsnHoraArribo: '',
		AsnOperador: '',
		AsnSello: '',
		AsnSelloClienteDateTime: '',
		TransporteLineaId: 0,
		TransporteTipoId: 0,
		AsnPlaca: '',
		AsnCaja: '',
		AsnContenedorUno: '',
		AsnContenedorDos: '',
	}

	this.QrySelBy = 'select AsnId, AsnFolio, ClienteId, AlmacenId, AsnFechaArribo, AsnHoraArribo, AsnOperador, AsnSello, AsnSelloClienteDateTime, TransporteLineaId, TransporteTipoId, AsnPlaca, AsnCaja, AsnContenedorUno, AsnContenedorDos FROM Asn WHERE ';

};
AsnMng.prototype = Object.create(BaseMng.prototype);
AsnMng.prototype.constructor = AsnMng;
AsnMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.AsnId = this.obj.AsnId == null ? this.Params.AsnId : this.obj.AsnId;
	this.Params.AsnFolio = this.obj.AsnFolio == null ? this.Params.AsnFolio : this.obj.AsnFolio;
	this.Params.ClienteId = this.obj.ClienteId == null ? this.Params.ClienteId : this.obj.ClienteId;
	this.Params.AlmacenId = this.obj.AlmacenId == null ? this.Params.AlmacenId : this.obj.AlmacenId;
	this.Params.AsnFechaArribo = this.obj.AsnFechaArribo == null ? this.Params.AsnFechaArribo : this.obj.AsnFechaArribo;
	this.Params.AsnHoraArribo = this.obj.AsnHoraArribo == null ? this.Params.AsnHoraArribo : this.obj.AsnHoraArribo;
	this.Params.AsnOperador = this.obj.AsnOperador == null ? this.Params.AsnOperador : this.obj.AsnOperador;
	this.Params.AsnSello = this.obj.AsnSello == null ? this.Params.AsnSello : this.obj.AsnSello;
	this.Params.AsnSelloClienteDateTime = this.obj.AsnSelloClienteDateTime == null ? this.Params.AsnSelloClienteDateTime : this.obj.AsnSelloClienteDateTime;
	this.Params.TransporteLineaId = this.obj.TransporteLineaId == null ? this.Params.TransporteLineaId : this.obj.TransporteLineaId;
	this.Params.TransporteTipoId = this.obj.TransporteTipoId == null ? this.Params.TransporteTipoId : this.obj.TransporteTipoId;
	this.Params.AsnPlaca = this.obj.AsnPlaca == null ? this.Params.AsnPlaca : this.obj.AsnPlaca;
	this.Params.AsnCaja = this.obj.AsnCaja == null ? this.Params.AsnCaja : this.obj.AsnCaja;
	this.Params.AsnContenedorUno = this.obj.AsnContenedorUno == null ? this.Params.AsnContenedorUno : this.obj.AsnContenedorUno;
	this.Params.AsnContenedorDos = this.obj.AsnContenedorDos == null ? this.Params.AsnContenedorDos : this.obj.AsnContenedorDos;
}
module.exports = AsnMng;