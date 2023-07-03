const Mysql = require('mysql2/promise');
const pool = Mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
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