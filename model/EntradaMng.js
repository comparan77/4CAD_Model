var BaseMng = require('../_common/basemng.js');

function EntradaMng (o, lst = null) {
	BaseMng.call(this, o, 'entrada', lst);

	this.Params = {
		Option: 0,
		Id: 0,
		Id_asn: 0,
		Folio: '',
		Cliente: '',
		Almacen: '',
		Producto: '',
		Tarimas: 0,
		Bultos: 0,
		Piezas: 0,
	}

	this.QrySelBy = 'select Id, Id_asn, Folio, Cliente, Almacen, Producto, Tarimas, Bultos, Piezas FROM entrada WHERE ';

};
EntradaMng.prototype = Object.create(BaseMng.prototype);
EntradaMng.prototype.constructor = EntradaMng;
EntradaMng.prototype.fillParameters = function(option) {
	this.Params.Option = option;
	this.Params.Id = this.obj.Id == null ? this.Params.Id : this.obj.Id;
	this.Params.Id_asn = this.obj.Id_asn == null ? this.Params.Id_asn : this.obj.Id_asn;
	this.Params.Folio = this.obj.Folio == null ? this.Params.Folio : this.obj.Folio;
	this.Params.Cliente = this.obj.Cliente == null ? this.Params.Cliente : this.obj.Cliente;
	this.Params.Almacen = this.obj.Almacen == null ? this.Params.Almacen : this.obj.Almacen;
	this.Params.Producto = this.obj.Producto == null ? this.Params.Producto : this.obj.Producto;
	this.Params.Tarimas = this.obj.Tarimas == null ? this.Params.Tarimas : this.obj.Tarimas;
	this.Params.Bultos = this.obj.Bultos == null ? this.Params.Bultos : this.obj.Bultos;
	this.Params.Piezas = this.obj.Piezas == null ? this.Params.Piezas : this.obj.Piezas;
}
module.exports = EntradaMng;