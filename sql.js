const mysql = require('mysql');

const pool = mysql.createPool({
    host: '35.199.63.1',
    user: 'bain',
    password: 'password',
    database: 'bain',
    acquireTimeout: 1000,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
    debug: false,
    /* Support for BigInteger, BigDecimal */
    supportBigNumbers: true,
    bigNumberStrings: true // Bigs are always returned as String
});

module.exports = {
    query: (a, b, c) => {
        pool.query(a, b, c);
    },
    escape: (v) => {
    	return pool.escape(v);
    }
};

