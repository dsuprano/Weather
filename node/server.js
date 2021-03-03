// RUTA BASE DEL SERVICIO
const basePath = '/v1/';

// PARSER PARA CONVERTIR EL PAYLOAD EN JSON (PARA POST/PUT REQUEST)
const bodyParser = require('body-parser');

// MIDDLEWARE PARA EL ACCESO Y CONTROL DE LAS PETICIONES
const cors = require('cors');

// FRAMEWORK EXPRESS NODE UTILIZADO EN ESTE CASO PARA EL ROUTER DE LA API
const express = require('express');
const app = express();
const port = process.env.PORT || 3005; // PUERTO

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`${basePath}health`, require('express-healthcheck')());
app.use(`${basePath}`, require('./api/routes/weather-routes'));
app.listen(port);

console.log('Weather node ' + port);
