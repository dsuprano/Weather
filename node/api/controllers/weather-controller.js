const fetch = require('node-fetch');
const locationURL = 'http://ip-api.com/json';
const weatherURL = 'https://api.weatherbit.io/v2.0';
const apiKey = '79488f618060496a8c98f3b3812c82ba';
const lang = 'es';
const units = 'M';
const days = 5;

class WeatherController {
  static *location(req, res) {
    fetch(`${locationURL}?lang=${lang}`)
      .then((response) => response.json())
      .then((json) => {
        try {
          return res.status(200).send(json);
        } catch (error) {
          return res.status(500).send({});
        }
      })
      .catch(() => res.status(500).send({}));
  }

  static *currentWeather(req, res) {
    const city = req.params.city ? req.params.city : '';
    const country = req.params.country ? req.params.country : '';

    fetch(`${weatherURL}/current?key=${apiKey}&lang=${lang}&units=${units}&city=${city}&country=${country}`)
      .then((response) => response.json())
      .then((json) => {
        try {
          return res.status(200).send(json);
        } catch (error) {
          return res.status(500).send({});
        }
      })
      .catch(() => res.status(500).send({}));
  }

  static *forecastWeather(req, res) {
    const city = req.params.city ? req.params.city : '';
    const country = req.params.country ? req.params.country : '';

    fetch(
      `${weatherURL}/forecast/daily?key=${apiKey}&lang=${lang}&units=${units}&city=${city}&country=${country}&days=${days}`,
    )
      .then((response) => response.json())
      .then((json) => {
        try {
          return res.status(200).send(json);
        } catch (error) {
          return res.status(500).send({});
        }
      })
      .catch(() => res.status(500).send({}));
  }
}

module.exports = WeatherController;
