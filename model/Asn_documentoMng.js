var BaseMng = require('../_common/basemng.js');

function Asn_documentoMng (o, lst = null) {
	BaseMng.call(this, o, 'asn_documento', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_asn: 0,
		Id_documento: 0,
		Referencia: '',
	}
};
Asn_documentoMng.prototype = Object.create(BaseMng.prototype);
Asn_documentoMng.prototype.constructor = Asn_documentoMng;
Asn_documentoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id;
	this.Params.Id_asn = this.obj.Id_asn;
	this.Params.Id_documento = this.obj.Id_documento;
	this.Params.Referencia = this.obj.Referencia;
}
module.exports = Asn_documentoMng;