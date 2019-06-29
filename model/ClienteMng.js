var BaseMng = require('../_common/basemng.js');

function ClienteMng (o, lst = null) {
	BaseMng.call(this, o, 'cliente', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Nombre: '',
	}
};
ClienteMng.prototype = Object.create(BaseMng.prototype);
ClienteMng.prototype.constructor = ClienteMng;
ClienteMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id;
	this.Params.Nombre = this.obj.Nombre;
}
module.exports = ClienteMng;