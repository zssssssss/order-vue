let express = require('express');
let app = express();
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'orders'
});
connection.connect();

app.use((req, res, next) => {
  //设置请求头
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 1728000,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.get('/getData', function (req, res) {
  connection.query('SELECT * from 2021y09m', function (error, results) {
    if (error) throw error;
    res.send(results);
  });
})

app.get('/getDisMonth', function (req, res) {
  connection.query('select distinct month(date) month, year(date) year from 2021y09m', function (error, results) {
    if (error) throw error;
    res.send(results);
  });
})

app.get('/getDisType', function (req, res) {
  connection.query('select distinct type from 2021y09m', function (error, results) {
    if (error) throw error;
    res.send(results);
  });
})

app.get('/getStaMonthMoney', function (req, res) {
  connection.query(`select sum(A.price) money, A.year, A.month
            from(select year(date) year, month(date) month, price from 2021y09m) A
            group by A.year, A.month`, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
})

app.get('/getStaTypeMoney', function (req, res) {
  connection.query(`select sum(price) money, type from 2021y09m group by type`, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
})

app.post('/getOrder', jsonParser, function (req, res) {
  let data = req.body
  connection.query(`select *
                    from 2021y09m
                    where id = ${data.id}`,
    (error, results) => {
      if (error) throw error;
      res.send(results);
    });
})

app.post('/action', function (req, res) {
  res.send('success')
})

app.post('/runSql', jsonParser, (req, res) => {
  let data = req.body
  connection.query(data.sqlCommand,
    (error, results) => {
      if (error) res.send('failure');
      res.send(results);
    });
})

app.post('/siftMonth', jsonParser, (req, res) => {
  let data = req.body
  connection.query(data.sqlCommand,
    (error, results) => {
      if (error) res.send('failure');
      res.send(results);
    });
})

app.post('/siftType', jsonParser, (req, res) => {
  let data = req.body
  connection.query(data.sqlCommand,
    (error, results) => {
      if (error) res.send('failure');
      res.send(results);
    });
})

app.post('/addOrder', jsonParser, (req, res) => {
  let data = req.body
  connection.query(`insert into 2021y09m (name, price, date, type)
                    values ('${data.name}', '${data.price}', '${data.date}', '${data.type}')`,
    (error, results) => {
      if (error) throw error;
      res.send('success');
    });
})

app.post('/delOrder', jsonParser, (req, res) => {
  let data = req.body
  connection.query(`delete
                    from 2021y09m
                    where id = ${data.id}`,
    (error, results) => {
      if (error) throw error;
      res.send('success');
    });
})

app.post('/modOrder', jsonParser, (req, res) => {
  let data = req.body
  connection.query(`update 2021y09m
                    set name='${data.name}',
                        price='${data.price}',
                        date='${data.date}',
                        type='${data.type}'
                    where id = ${data.id}`,
    (error, results) => {
      if (error) throw error;
      res.send('success');
    });
})

let server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
