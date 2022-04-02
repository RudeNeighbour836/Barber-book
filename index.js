const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.set('views','pages');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', function(request, response){
    response.render('Barber_Black_Sheep');
});

app.listen(port);
console.log(`Server is listening on port ${port}`);