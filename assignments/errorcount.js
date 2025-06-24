const express = require('express');
const app = express();

//Express server with a few endpoints
//Task: 1. Ensure that when there is an exception, user sees a status code of 404
// 2. Maintain the errorCount variable whose value shold go up every tme there is an exception in any endpoint




let errorCount = 0; //defined a variable to store the error count

app.get('/user', function(req,res) {
    throw new Error("Error!");
    res.status(200).json({name:john}); //this line is not executed as the above line throws an error
})

app.get("/errors", function(req,res) {  // this route shows the number of errors
    res.json({errorCount});
})

app.use(function(err, req ,res,next) {
    errorCount = errorCount + 1;
    res.status(404).send({})  
})

app.listen(3000);