const mysql = require('mysql');

const config = require('../config/config');

//应用池连接
const pool = mysql.createPool(config.dataBaseConfig);

const query =async (sqlText) => {
    return await new Promise((resolve, reject) => {
        pool.query(sqlText,(err, result) => {
            if(err) {
                reject(err);
            };
            resolve(result);
          });
    })
};

module.exports = {pool, query};