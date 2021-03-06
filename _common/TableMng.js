function TableMng() { };

// TableMng.fillObj = function(objMng, row) {
//     Object.keys(row).forEach(item => {
//         if(objMng.obj.hasOwnProperty(item)) {
//             objMng.obj[item] = row[item];
//         }
//     });
// }

TableMng.cloneObj = function(clon, obj) {
    Object.keys(obj).forEach(item => {
        if(clon.hasOwnProperty(item)) {
            clon[item] = obj[item];
        }
    });
}

TableMng.Execute = function(pool, sql, values, callback, callerr) {
    pool.query(sql, values, function(err, res, fields) {
        if(err) {
            if(callerr) callerr(err);
            else throw err;
        }
        else if(callback) callback(res);
    });
}

TableMng.SelectBy = function(pool, objMng, condition, values, callback) {
    pool.query(objMng.QrySelBy + condition, values, function(err, res, fields) {
        if(err) throw err;
        switch (res.length) {
            case 0:
                break;
            case 1:
                TableMng.cloneObj(objMng.obj, res[0]);
                break;
            default:
                break;
        }
        if(callback) callback(res);
    });
}

TableMng.Action = function(pool, objMng, action, callback) {
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
        var data;
        switch (action) {
            case 'get':
                TableMng.cloneObj(objMng.obj, res[0][0]);
                data = res[0];
                break;
            case 'add':
                objMng.obj.Id = res[0][0].id;
            default:
                data = res[0];
        }
        if(callback) callback(data);
    });
}

module.exports = TableMng;
