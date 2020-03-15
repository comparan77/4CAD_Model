var BaseMng = require('../_common/basemng.js');

function TransporteLineaTipoMng (o, lst = null) {
	BaseMng.call(this, o, 'TransporteLineaTipo', lst);

	this.Params = {
		Option: 0,
		id: 0,
		TransporteLineaId: 0,
		TransporteTipoId: 0,
	}

	this.QrySelBy = 'select id, TransporteLineaId, TransporteTipoId FROM TransporteLineaTipo WHERE ';

};
TransporteLineaTipoMng.prototype = Object.create(BaseMng.prototype);
TransporteLineaTipoMng.prototype.constructor = TransporteLineaTipoMng;
TransporteLineaTipoMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.id = this.obj.id == null ? this.Params.id : this.obj.id;
	this.Params.TransporteLineaId = this.obj.TransporteLineaId == null ? this.Params.TransporteLineaId : this.obj.TransporteLineaId;
	this.Params.TransporteTipoId = this.obj.TransporteTipoId == null ? this.Params.TransporteTipoId : this.obj.TransporteTipoId;
}
module.exports = TransporteLineaTipoMng;