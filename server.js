const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// 设置解析表单提交的数据
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

// 配置MySQL连接
const db = mysql.createConnection({
    host: 'localhost',     // 你的数据库地址
    user: 'root',          // 数据库用户名
    password: '@Wyw20041105',          // 数据库密码
    database: 'JadeWangMirror1' // 你的数据库名称
});

// 连接数据库
db.connect((err) => {
    if (err) {
        console.error('MySQL连接失败：', err);
        throw err;
    }
    console.log('成功连接到MySQL数据库');
});

// 注册功能
// 注册功能
app.post('/register', (req, res) => {
    const { uname, psw } = req.body;

    // 哈希密码
    bcrypt.hash(psw, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('服务器错误');
        }

        // 将用户名和哈希密码插入到数据库
        const query = 'INSERT INTO users (username, `password`) VALUES (?, ?)';
        db.query(query, [uname, hash], (err, result) => {
            if (err) {
                return res.status(500).send('注册失败');
            }

            // 注册成功后重定向到 social.html
            res.redirect('/login.html');
        });
    });
});
// 处理登录POST请求
// 处理登录POST请求
app.post('/login', (req, res) => {
    const username = req.body.uname;
    const password = req.body.psw;

    // 验证用户名和密码
    const query = 'SELECT * FROM users WHERE username = ? AND `password` = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('数据库查询错误：', err);
            return res.status(500).send('服务器内部错误');
        }

        if (results.length > 0) {
            // 如果找到匹配的用户，重定向到 social.html
            res.redirect('/social.html');
        } else {
            // 用户名或密码错误
            res.send('<h1>Login Failed</h1><p>Invalid username or password.</p>');
        }
    });
});

// 监听端口
app.listen(3000, () => {
    console.log('服务器正在运行在端口 3000');
});