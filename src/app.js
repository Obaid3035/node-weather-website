const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handler-bar and views location
app.set('view engine', 'hbs');
console.log(app.get('views'))
app.set('views', viewsPath);
console.log(app.get('views'))
hbs.registerPartials(partialsPath);

//setup static directory for server
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
   res.render('index', {
       title: 'Weather',
       name: 'Obaid'
   });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Obaid'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Obaid'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
           error: 'You need to provide Address'
       })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return  res.send({
                error,
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                })
            }

            res.send({
                location,
                forecast: forecastData
            })
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Obaid',
        errorMessage: 'Help article not found',
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Obaid',
        errorMessage: 'Page not found'
    });
});








app.listen(3000, () => {
    console.log('Server is up on port 3000');
});