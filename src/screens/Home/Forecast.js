import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import WeatherService from 'services/WeatherService';

import LoadingScreen from 'components/LoadingScreen';
import ScreenError from 'components/ScreenError';
import ForecastItem from 'components/ForecastItem';

const styles = {
  container: {
    backgroundColor: '#fff',
  },
};

const ForecastScreen = ({ search }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await WeatherService.getForecastWeather(search.city, search.country);
        setWeather(response);
        setLoading(false);
      } catch (err) {
        if (typeof err === 'object') {
          setError(err?.message || 'Error in forecast weather');
        } else {
          setError(err || 'Error in forecast weather');
        }
        setLoading(false);
      }
    })();
  }, [search]);

  if (error) {
    return <ScreenError content={error} />;
  }

  if (loading || !weather) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerItems}>
          {weather.data.map((item) => {
            return <ForecastItem key={item.valid_date} item={item} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ForecastScreen;
