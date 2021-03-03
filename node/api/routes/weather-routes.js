// GENERADOR DE RUTAS EXPRESS
const Router = require('co-router');
const router = Router();

// CONTROLADOR
const weatherFunctions = require('../controllers/weather-controller');

// RUTAS
router.get('/location', weatherFunctions.location);
router.get('/current/:city/:country', weatherFunctions.currentWeather);
router.get('/forecast/:city/:country', weatherFunctions.forecastWeather);

module.exports = router;
