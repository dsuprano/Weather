import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import WeatherService from 'services/WeatherService';
import moment from 'moment';
import { capitalize } from 'lodash';

import LoadingScreen from 'components/LoadingScreen';
import ScreenError from 'components/ScreenError';
import DataRow from 'components/DataRow.js';

const styles = {
  container: {
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 20,
  },
  containerTitle: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  containerTemp: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    marginVertical: 20,
  },
  textTemp: {
    fontSize: 120,
  },
  containerCurrentInfo: {
    padding: 20,
  },
  titleCurrentInfo: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
};

const TodayScreen = ({ search }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await WeatherService.getCurrentWeather(search.city, search.country);
        setWeather(response);
        setLoading(false);
      } catch (err) {
        if (typeof err === 'object') {
          setError(err?.message || 'Error in current weather');
        } else {
          setError(err || 'Error in current weather');
        }
        setLoading(false);
      }
    })();
  }, [search]);

  const numberToCelsius = (value) => {
    return `${value.toFixed(0)}°`;
  };

  if (error) {
    return <ScreenError content={error} />;
  }

  if (loading || !weather) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{moment(weather.ob_time).format('LL')}</Text>
        </View>
        <View style={styles.containerTemp}>
          <Text style={styles.textTemp}>{numberToCelsius(weather.temp)}</Text>
          <Text style={styles.textFeelsTemp}>{`Sensasión térmica de ${numberToCelsius(weather.app_temp)}`}</Text>
          <View style={styles.containerTempDescription}>
            <Text style={styles.textTempDescription}>{capitalize(weather.weather.description)}</Text>
          </View>
        </View>
        <View style={styles.containerCurrentInfo}>
          <Text style={styles.titleCurrentInfo}>Información actual</Text>
          <DataRow label="Humedad" value={`${weather.rh}%`} />
          <DataRow label="Punto de rocío" value={`${numberToCelsius(weather.dewpt)}`} />
          <DataRow label="Presión" value={`${weather.pres.toFixed(1)} mbar`} />
          <DataRow label="Visibilidad" value={`${weather.vis.toFixed(1)} km`} />
          <DataRow label="Viento" value={`${weather.wind_spd.toFixed(1)}m/s ${weather.wind_cdir_full}`} />
          <DataRow label="Índice UV" value={`${weather.uv.toFixed(0)}`} />
        </View>
      </View>
    </ScrollView>
  );
};

export default TodayScreen;
