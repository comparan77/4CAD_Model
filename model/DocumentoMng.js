var BaseMng = require('../_common/basemng.js');

function DocumentoMng (o, lst = null) {
	BaseMng.call(this, o, 'documento', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
	}
};
DocumentoMng.prototype = Object.create(BaseMng.prototype);
DocumentoMng.prototype.constructor = DocumentoMng;
DocumentoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id;
	this.Params.Nombre = this.obj.Nombre;
}
module.exports = DocumentoMng;