var BaseMng = require('../_common/basemng.js');

function AduanaMng (o, lst = null) {
	BaseMng.call(this, o, 'aduana', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Codigo: '',
		Nombre: '',
	}
};
AduanaMng.prototype = Object.create(BaseMng.prototype);
AduanaMng.prototype.constructor = AduanaMng;
AduanaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Codigo = this.obj.Codigo == null ? this.Params.Codigo : this.obj.Codigo;
	this.Params.Nombre = this.obj.Nombre == null ? this.Params.Nombre : this.obj.Nombre;
}
module.exports = AduanaMng;