var BaseMng = require('../_common/basemng.js');

function VendorMng (o, lst = null) {
	BaseMng.call(this, o, 'Vendor', lst);

	this.Params = {
		Option: 0,
		VendorId: 0,
		VendorCodigo: '',
		VendorNombre: '',
	}

	this.QrySelBy = 'select VendorId, VendorCodigo, VendorNombre FROM Vendor WHERE ';

};
VendorMng.prototype = Object.create(BaseMng.prototype);
VendorMng.prototype.constructor = VendorMng;
VendorMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.VendorId = this.obj.VendorId == null ? this.Params.VendorId : this.obj.VendorId;
	this.Params.VendorCodigo = this.obj.VendorCodigo == null ? this.Params.VendorCodigo : this.obj.VendorCodigo;
	this.Params.VendorNombre = this.obj.VendorNombre == null ? this.Params.VendorNombre : this.obj.VendorNombre;
}
module.exports = VendorMng;