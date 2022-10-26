import query from '../mysql-connect';
import express from 'express';
import moment from 'moment';

async function getMysqlUser(){
    const user = await query('SELECT User, Host FROM mysql.user;')
    return user[0].User;
}

let router = express.Router();
router.get('/', async function(req, res) {
    let title = 'Nodejs-Template '
    let today = new moment().format('YYYY-MM-DD HH:mm:ss')
    const user = await getMysqlUser()
    res.render('index', {
        today,
        title,
        user
    });
});

module.exports = router;