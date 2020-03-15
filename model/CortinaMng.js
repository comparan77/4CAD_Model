var BaseMng = require('../_common/basemng.js');

function CortinaMng (o, lst = null) {
	BaseMng.call(this, o, 'Cortina', lst);

	this.Params = {
		Option: 0,
		CortinaId: 0,
		AlmacenId: 0,
		CortinaNombre: '',
	}

	this.QrySelBy = 'select CortinaId, AlmacenId, CortinaNombre FROM Cortina WHERE ';

};
CortinaMng.prototype = Object.create(BaseMng.prototype);
CortinaMng.prototype.constructor = CortinaMng;
CortinaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.CortinaId = this.obj.CortinaId == null ? this.Params.CortinaId : this.obj.CortinaId;
	this.Params.AlmacenId = this.obj.AlmacenId == null ? this.Params.AlmacenId : this.obj.AlmacenId;
	this.Params.CortinaNombre = this.obj.CortinaNombre == null ? this.Params.CortinaNombre : this.obj.CortinaNombre;
}
module.exports = CortinaMng;