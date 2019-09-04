var BaseMng = require('../_common/basemng.js');

function Transporte_lineaMng (o, lst = null) {
	BaseMng.call(this, o, 'transporte_linea', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
		Rfc: '',
	}
};
Transporte_lineaMng.prototype = Object.create(BaseMng.prototype);
Transporte_lineaMng.prototype.constructor = Transporte_lineaMng;
Transporte_lineaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
	this.Params.Rfc = this.obj.Rfc == null ? this.Params.Rfc : this.obj.Rfc;
}
module.exports = Transporte_lineaMng;