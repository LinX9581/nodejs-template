const Mysql = require('mysql2/promise');
const pool = Mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
let query = async function(query, data) {
    try {
        const rows = await pool.query(query, data);
        return rows[0];
    } catch (err) {
        console.log('ERROR => ' + err);
        return err;
    }
}
module.exports = query