const express = require('express');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const con = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    database:'score_ranking2'
});

const port_ = process.env.PORT || 5000;
console.log(port_);

const server = app.listen(port_, function(){
    console.log('wazzapppp');
    const host = server.address().address
    const port = server.address().port
});
// const server = app.listen(5000, function(){
//     const host = server.address().address
//     const port = server.address().port
// });

con.connect(function(error){
    if(error) console.log(error);
    else console.log('connected');
});

app.get('/', (req, res) => {
    res.json({
        message:'You are in baby!!'
    });
});

app.get('/users', (req, res) => {
    con.query('select * from users', function(error, rows, fields){
        if(error) console.log(error)
        else{
            // console.log(rows);
            res.send(rows);
        }
    });
});


app.post('/users', (req, res) => {
    let post = { id: req.body.id, name: req.body.user, score: req.body.score };
    console.log(req.body.id);
    let sql = 'INSERT INTO users SET ?';
    let query = con.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});

app.post('/users/delete', (req, res) => {
    // let post = [req.body.score]
    // let post = {id:req.body.id, name:req.body.user, score: req.body.score };
    let post = { id:req.body.id };
    let sql = 'DELETE FROM users WHERE ?';
    let query = con.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('1 post deleted');
    });
});

app.post('/users/update', (req, res) => {
    // let post = [req.body.score]
    // let post = {id:req.body.id, name:req.body.user, score: req.body.score };
    // let post = { score:req.body.score };
    let sql = 'UPDATE users SET name=?, score=? WHERE id=?';
    let query = con.query(sql, [req.body.name, req.body.score, req.body.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('1 post deleted');
    });
});

