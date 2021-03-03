import API from 'helpers/api';
import appConfig from 'config';

class WeatherService {
  static getLocation() {
    // TEST WITH NODEJS
    // return API.get('http://myLocalIp:3005/v1/location').then(({ data }) => data);
    return API.get('http://ip-api.com/json', { params: { lang: appConfig.lang } }).then(({ data }) => data);
  }

  static getCurrentWeather(city, country) {
    // TEST WITH NODEJS
    // return API.get(`http://myLocalIp:3005/v1/current/${city}/${country}`).then(({ data }) => data.data[0]);
    return API.get('/current', {
      params: {
        city,
        country,
        key: appConfig.apiKey,
        lang: appConfig.lang,
        units: 'M',
      },
    }).then(({ data }) => data.data[0]);
  }

  static getForecastWeather(city, country) {
    // TEST WITH NODEJS
    // return API.get(`http://myLocalIp/v1/forecast/${city}/${country}`).then(({ data }) => data);
    return API.get('/forecast/daily', {
      params: {
        city,
        country,
        key: appConfig.apiKey,
        lang: appConfig.lang,
        units: 'M',
        days: 5,
      },
    }).then(({ data }) => data);
  }
}

export default WeatherService;
