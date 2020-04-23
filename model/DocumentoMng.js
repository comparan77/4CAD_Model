var BaseMng = require('../_common/basemng.js');

function DocumentoMng (o, lst = null) {
	BaseMng.call(this, o, 'Documento', lst);

	this.Params = {
		Option: 0,
		DocumentoId: 0,
		DocumentoNombre: '',
	}

	this.QrySelBy = 'select DocumentoId, DocumentoNombre FROM Documento WHERE ';

};
DocumentoMng.prototype = Object.create(BaseMng.prototype);
DocumentoMng.prototype.constructor = DocumentoMng;
DocumentoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.DocumentoId = this.obj.DocumentoId == null ? this.Params.DocumentoId : this.obj.DocumentoId;
	this.Params.DocumentoNombre = this.obj.DocumentoNombre == null ? this.Params.DocumentoNombre : this.obj.DocumentoNombre;
}
module.exports = DocumentoMng;