var BaseMng = require('../_common/basemng.js');

function AduanaMng (o, lst = null) {
	BaseMng.call(this, o, 'Aduana', lst);

	this.Params = {
		Option: 0,
		AduanaId: 0,
		AduanaClave: '',
		AduanaNombre: '',
	}

	this.QrySelBy = 'select AduanaId, AduanaClave, AduanaNombre FROM Aduana WHERE ';

};
AduanaMng.prototype = Object.create(BaseMng.prototype);
AduanaMng.prototype.constructor = AduanaMng;
AduanaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.AduanaId = this.obj.AduanaId == null ? this.Params.AduanaId : this.obj.AduanaId;
	this.Params.AduanaClave = this.obj.AduanaClave == null ? this.Params.AduanaClave : this.obj.AduanaClave;
	this.Params.AduanaNombre = this.obj.AduanaNombre == null ? this.Params.AduanaNombre : this.obj.AduanaNombre;
}
module.exports = AduanaMng;