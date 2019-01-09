const express = require('express');

const app = express();

const session = app.listen(1337);

const bodyParser = require('body-parser');

const session = require('express-session');

app.set('views', `${__dirname}/views`);

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/', function (request, response) {
    const languages_array = [
        "Choose Language",
        "JAVA",
        "PYTHON",
        "C#/.NET",
        "MEAN",
        "RUBY"
    ];

    const location_array = [
        "Choose Location",
        "Berkeley, California",
        "Boise, Idaho",
        "Chicago, Illinois",
        "Dallas, Texas",
        "Los Angeles, California",
        "San Jose, California",
        "Seattle, Washington",
        "Tulsa, Oklahoma",
        "Tysons Corner, Virginia"
    ];

    response.render('index', { locations:location_array, languages:languages_array  });

});

app.post('/proc_survey', function (request, response) {

    console.log(request.body);
    request.session.surveyResults = request.body;
    console.log("printing surveyResults:");
    console.log(request.session.surveyResults);
        

    response.redirect('/results');
});


app.get('/results', function(request, response){
    console.log("IM HEREEEEEE in the results page!");
    console.log("printing surveyResults:");
    console.log(request.session.surveyResults);
    const surveyResults = request.session.surveyResults;
    response.render('results', {surveyResults});
});


app.listen(8000, function () {
    console.log(`Listening on port 8000`);
});