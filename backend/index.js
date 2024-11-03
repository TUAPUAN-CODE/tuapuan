require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
const mysql = require('mysql2');

// ตั้งค่า CORS
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// เส้นทาง API สำหรับดึงข้อมูลผู้ใช้
app.get('/user', function (req, res, next) {
  connection.query(
    'SELECT * FROM `user`',
    function(err, results, fields) {
      if (err) {
        return res.status(500).json({ error: err.message }); // ส่งกลับข้อผิดพลาดหากมี
      }
      res.json(results);
    }
  );
});

// เส้นทาง API ทดสอบ
app.get('/hello-world', function (req, res, next) {
  res.json({msg: 'hello-world'});
});

// เริ่มเซิร์ฟเวอร์
app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000');
});
