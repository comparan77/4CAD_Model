var BaseMng = require('../_common/basemng.js');

function ClienteMng (o, lst = null) {
	BaseMng.call(this, o, 'Cliente', lst);

	this.Params = {
		Option: 0,
		ClienteId: 0,
		ClienteClave: '',
		ClienteNombre: '',
	}

	this.QrySelBy = 'select ClienteId, ClienteClave, ClienteNombre FROM Cliente WHERE ';

};
ClienteMng.prototype = Object.create(BaseMng.prototype);
ClienteMng.prototype.constructor = ClienteMng;
ClienteMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.ClienteId = this.obj.ClienteId == null ? this.Params.ClienteId : this.obj.ClienteId;
	this.Params.ClienteClave = this.obj.ClienteClave == null ? this.Params.ClienteClave : this.obj.ClienteClave;
	this.Params.ClienteNombre = this.obj.ClienteNombre == null ? this.Params.ClienteNombre : this.obj.ClienteNombre;
}
module.exports = ClienteMng;