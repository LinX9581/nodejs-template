import query from '../mysql-connect';
import express from 'express';
import moment from 'moment';

let router = express.Router();
router.get('/', async function(req, res) {
    let title = 'Nodejs-Report '
    let today = new moment().format('YYYY-MM-DD HH:mm:ss')
    console.log('report');
    res.render('report', {
        today,
        title,
    });
});

router.post('/', async function(req, res) {
    console.log(req.body);
    let dept = req.body.dept
    let begin_date = req.body.begin_date
    let end_date = req.body.end_date

    let testData = [
        {
            "客戶編號": "SHU1001",
            "客戶名稱": "+x",
            "客戶地址": "台北市",
            "付款條件": "信用卡",
            "信用等級": "3",
            "賒銷額度": "500000"
        },
        {
            "客戶編號": "SHU1002",
            "客戶名稱": "-x",
            "客戶地址": "新北市",
            "付款條件": "現金",
            "信用等級": "2",
            "賒銷額度": "1000000"
        }
    ]
    
    res.send(JSON.stringify({
        "data": testData,
    }));
});

module.exports = router;