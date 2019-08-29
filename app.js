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
 client.query("INSERT INTO recipies(name,ingredients,direction)values($1,$2,$3);",[req.body.name,req.body.ingredients,req.body.direction],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else res.redirect('/');
});

});
app.get('/', function(req, res) {
    client.query("SELECT * FROM recipies",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('index',{recipies:result.rows});
    });
  });

//port
app.listen(8000); //our app is running on port no 8080
console.log('Server started at port 8000');
