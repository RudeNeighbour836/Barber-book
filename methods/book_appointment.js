const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended : false});
const Date = date;
const Service = service;
const fs = require('fs');
const filename= require('details.json');


let rawData = fs.readFileSync(filename);
let data = Json.parse(rawData);

app.set('views','views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


        function book(Date, Service){
            Date = this.date;
            Service = this.service;

            app.post('/book', urlEncodedParser, function (request,response){

                const fs = require('fs');
                const path = require('path');
                
                let newbooking = {
                    service: request.body.service,
                    date : request.body.date,
                };
    
                if(date!==null && service !== null){
                    data.push(newbooking);
                    fs.writeFileSync(filename, JSON.stringify(data,null, 2));
                }
                else{
                    alert('Please enter Date to book Service');   
                }

            });          
        }

module.exports = {book};
        