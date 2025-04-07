import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import './global'
import indexRouter from './route/indexRouter';
import reportRouter from './route/reportRouter';
import healthRouter from './route/healthRouter';
import { errorHandler } from './component/errorHandler';
import './schedule/schedule';

const app = express();
const http = require('http').Server(app);

// 顯示啟動信息
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Config loaded: ${JSON.stringify(config)}`);

app.set("views", "views/");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/', indexRouter);
app.use('/report', reportRouter);
app.use('/api/health', healthRouter);
// 捕獲 404 錯誤
app.use((req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
});

const host = '0.0.0.0';
const port = process.env.PORT || config.port || 3008;

http.listen(port, host, function() {
    console.log(`Server started on port ${port}`);
});
