var BaseMng = require('../_common/basemng.js');

function TransporteLineaMng (o, lst = null) {
	BaseMng.call(this, o, 'TransporteLinea', lst);

	this.Params = {
		Option: 0,
		TransporteLineaId: 0,
		TransporteLineaNombre: '',
		TransporteLineaRfc: '',
	}

	this.QrySelBy = 'select TransporteLineaId, TransporteLineaNombre, TransporteLineaRfc FROM TransporteLinea WHERE ';

};
TransporteLineaMng.prototype = Object.create(BaseMng.prototype);
TransporteLineaMng.prototype.constructor = TransporteLineaMng;
TransporteLineaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.TransporteLineaId = this.obj.TransporteLineaId == null ? this.Params.TransporteLineaId : this.obj.TransporteLineaId;
	this.Params.TransporteLineaNombre = this.obj.TransporteLineaNombre == null ? this.Params.TransporteLineaNombre : this.obj.TransporteLineaNombre;
	this.Params.TransporteLineaRfc = this.obj.TransporteLineaRfc == null ? this.Params.TransporteLineaRfc : this.obj.TransporteLineaRfc;
}
module.exports = TransporteLineaMng;