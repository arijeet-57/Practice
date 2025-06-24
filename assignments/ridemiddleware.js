const express = require('express');
const app = express();

//function that return a boolean if the age of the person is more than 14

// function isOldEnough(age) {
//     if(age >= 14) {
//         return true;
//     }else{
//         return false;
//     }
// };

// app.get ("/ride1", function(req,res) { //ride 1
//     if(isOldEnough (req.query.age)) {  //req.query.age takes the age of the user in the url as ?age=<age>
//         res.json({
//              msg: "You have successfully rden the ride 1"
//     });
//     }else {
//         res.status(411).json({
//             msg: "Sorry you are not of age yet"
//         })
//     }
    
// });

// app.get ("/ride2", function(req,res) { //ride 2
//     if(isOldEnough (req.query.age)) {  //req.query.age takes the age of the user in the url as ?age=<age>
//         res.json({
//              msg: "You have successfully rden the ride 2"
//     });
//     }else {
//         res.status(411).json({
//             msg: "Sorry you are not of age yet"
//         })
//     }
    
// });  



// a better way to do the above process is using middlewares, where the routes will onle mention the middelware and all the authenticating will be done
// by the route, will not have to check for age again and again in the routes. The routes will do what they are meant to do
// below is the better code version

function isOldEnoughMiddleware(req, res, next) {
    const age = req.query.age; //req.query.age takes the age of the user in the url as ?age=<age>
    if(age >= 14) {
        next(); //this will move the control to the next function in the chain which is the app.get, only when the condition for the "if" is true, otherwise]
        //it will execute the else block
    }else{
        res.json({
            msg: "Sorry you are not of age yet !"
        })
    }
}

//app.use(isOldEnoughMiddleware); --> this we can do here when we know that all the upcoming routes will use this middlware, 
// app.use only triggers the endpoints below it.

app.get ("/ride1", isOldEnoughMiddleware ,function(req,res) { //ride 1 wiht the middleare function call
        res.json({
             msg: "You have successfully rden the ride 1"
        });
    }
);

app.get ("/ride2",isOldEnoughMiddleware , function(req,res) { //ride 2 with the  
        res.json({
             msg: "You have successfully rden the ride 2"
        });
    }
);  


app.listen(3000);