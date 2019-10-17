var BaseMng = require('../_common/basemng.js');

function Asn_documentoMng (o, lst = null) {
	BaseMng.call(this, o, 'asn_documento', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_asn: 0,
		Id_documento: 0,
		Referencia: '',
		Requerido: false,
	}

	this.QrySelBy = 'select Id, Id_asn, Id_documento, Referencia, Requerido FROM asn_documento WHERE ';

};
Asn_documentoMng.prototype = Object.create(BaseMng.prototype);
Asn_documentoMng.prototype.constructor = Asn_documentoMng;
Asn_documentoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_asn = this.obj.Id_asn == null ? this.Params.Id_asn : this.obj.Id_asn;
	this.Params.Id_documento = this.obj.Id_documento == null ? this.Params.Id_documento : this.obj.Id_documento;
	this.Params.Referencia = this.obj.Referencia == null ? this.Params.Referencia : this.obj.Referencia;
	this.Params.Requerido = this.obj.Requerido == null ? this.Params.Requerido : this.obj.Requerido;
}
module.exports = Asn_documentoMng;