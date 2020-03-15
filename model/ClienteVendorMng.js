var BaseMng = require('../_common/basemng.js');

function ClienteVendorMng (o, lst = null) {
	BaseMng.call(this, o, 'ClienteVendor', lst);

	this.Params = {
		Option: 0,
		ClienteVendorId: 0,
		ClienteId: 0,
		VendorId: 0,
	}

	this.QrySelBy = 'select ClienteVendorId, ClienteId, VendorId FROM ClienteVendor WHERE ';

};
ClienteVendorMng.prototype = Object.create(BaseMng.prototype);
ClienteVendorMng.prototype.constructor = ClienteVendorMng;
ClienteVendorMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.ClienteVendorId = this.obj.ClienteVendorId == null ? this.Params.ClienteVendorId : this.obj.ClienteVendorId;
	this.Params.ClienteId = this.obj.ClienteId == null ? this.Params.ClienteId : this.obj.ClienteId;
	this.Params.VendorId = this.obj.VendorId == null ? this.Params.VendorId : this.obj.VendorId;
}
module.exports = ClienteVendorMng;