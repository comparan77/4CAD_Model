var BaseMng = require('../_common/basemng.js');

function FolioMng (o, lst = null) {
	BaseMng.call(this, o, 'folio', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Tipo: '',
		Anio_actual: 0,
		Actual: 0,
		Digitos: 0,
	}
};
FolioMng.prototype = Object.create(BaseMng.prototype);
FolioMng.prototype.constructor = FolioMng;
FolioMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Tipo = this.obj.Tipo == null ? this.Params.Tipo : this.obj.Tipo;
	this.Params.Anio_actual = this.obj.Anio_actual == null ? this.Params.Anio_actual : this.obj.Anio_actual;
	this.Params.Actual = this.obj.Actual == null ? this.Params.Actual : this.obj.Actual;
	this.Params.Digitos = this.obj.Digitos == null ? this.Params.Digitos : this.obj.Digitos;
}
module.exports = FolioMng;