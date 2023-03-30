import query from '../mysql-connect';
import express from 'express';
import moment from 'moment';

console.log(process.env.USER);
// getMysqlUser()
async function getMysqlUser() {
    const user = await query('SELECT User, Host FROM mysql.user;')
    console.log(user);
    return user[0].User;
}

let router = express.Router();
router.get('/', async function(req, res) {
    let title = 'Nodejs-Template '
    let today = new moment().format('YYYY-MM-DD HH:mm:ss')
    res.render('index', {
        today,
        title,
    });
});

module.exports = router;