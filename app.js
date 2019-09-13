var express=require('express');
var bodyParser = require('body-parser');
const { Pool,Client} =require('pg')
var path=require('path')
/*  end      */



/* Configuration to connect to database */


const connectionString =(process.env.pg_URI ||"postgres://st:shyam02@localhost:5432")

const client = new Client({
    connectionString:connectionString
})

client.connect()
/*  end      */



//creating express object
app=express();



//seting view engine to ejs
app.set('view engine','ejs');


// using bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

//file handeling

app.post('/add',function(req,res){
    console.log(req.body.name);
 client.query("INSERT INTO donation(name,thing,amount,number)values($1,$2,$3,$4);",[req.body.name,req.body.thing,req.body.amount,req.body.number],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else res.redirect('/');
});

});
app.get('/', function(req, res) {
    client.query("SELECT * FROM donation",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('index',{donation:result.rows});
    });
  });

//port
app.listen(8080); //our app is running on port no 8080
console.log('Server started at port 8080');
