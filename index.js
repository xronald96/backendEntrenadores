var express = require('express');
var os = require('os');
var app = express();
var assignment = require('./actions/assignment')


app.use(express.json());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  return next();
});

app.use(express.static('public'));

//Routes

app.get('/', (req, res) =>{
  res.send("Servidor desplegado");
})

app.post('/assignment', function(req, res) {
    if(!req.body.clients || !req.body.trainers)
            res.status(404).send('Clients and trainers are required')
    assignment.assignmentAlgorithm(req.body).then(result =>{
        res.status(200).send(result);
    }).catch(err =>{
      res.status(404).send(err);
    });
  });
 
var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
 
})