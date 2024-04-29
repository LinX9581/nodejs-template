import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import './global'
import indexRouter from './route/indexRouter';
import reportRouter from './route/reportRouter';
import fileRouter from './route/fileRouter';
import './schedule/schedule';
const app = express();
const http = require('http').Server(app);

console.log(process.env.NODE_ENV)
console.log(config)

app.set("views", "views/");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/report', reportRouter);
app.use('/file', fileRouter);

const host = '0.0.0.0';
const port = process.env.PORT || config.port || 3005;

http.listen(port, host, function() {
    console.log("Server started on " + port);
});
