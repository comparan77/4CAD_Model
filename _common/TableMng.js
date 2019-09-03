function TableMng() { };

TableMng.Select = function(pool, sql, values, callback, tran = null) {
    pool.query(sql, values, function(err, res, fields) {
        if(err) throw err;
        if(callback) callback(res);
    });
}

TableMng.Action = function(pool, objMng, action, callback, tran = null) {
    var _ = this;
    var opcion = 0;
    switch (action) {
        case 'lst':
            opcion = 0;
            break;
        case 'get':
            opcion = 1;
            break;
        case 'add':
            opcion = 2;
            break;
        case 'udt':
            opcion = 3;
            break;
        case 'dlt':
            opcion = 4;
            break;
        default:
            break;
    }

    objMng.fillParameters(opcion);
    var values = Object.values(objMng.Params);
    var params = '(' + Object.values(objMng.Params).fill('?') + ')';
    pool.query('call sp_' + objMng.TableName + params, values, function(err, res, fields) {
        if(err) throw err;
        if(callback) callback(res[0]);
    });
}

module.exports = TableMng;
