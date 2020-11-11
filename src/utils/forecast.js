const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const weatherStackApiKey = 'e8f225b7b35e1c21bbad18b2ba04fef0';
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${longitude},${latitude}`;

    request({url: weatherStackUrl, json: true}, (error, {body}) => {
       if (error) {
           callback('Unable to connect weather service!', undefined);
       } else if (body.error) {
           callback('Unable to connect weather service!', undefined);
       } else {
           callback(undefined, `It is currently ${body.current.temperature} degrees out.`);
       }
    });
};

module.exports = forecast;