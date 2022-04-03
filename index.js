const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const filename = 'details.json';
const urlEncodedParser = bodyParser.urlencoded({extended: false});

//load data from JSON
let rawData = fs.readFileSync(filename);
let data = JSON.parse(rawData);

app.set('views','pages');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', function(request, response){
    response.render('Barber_Black_Sheep');
});
//restful Get web serices
app.get('/book', function(request, response){
    data.sort((a, b) =>(a.name > b.name)? 1 : -1);
    response.send(data);
});

app.post('/book', urlEncodedParser,function(request, response){
    
    const fs = require('fs');
    const path = require('path');

    let newbooking =
        {
            service: request.body.service,
            date: request.body.date,
        };

    data.push(newbooking);
    fs.writeFileSync(filename,JSON.stringify(data, null, 2));
    response.render('booking_confirmation', newbooking);
});

app.listen(port);
console.log(`Server is listening on port ${port}`);