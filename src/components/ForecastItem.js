import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

import DataRow from './DataRow.js';

const styles = {
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDescription: {
    flex: 1,
  },
  textDescriptionDate: {
    fontWeight: 'bold',
  },
  textDescription: {
    color: 'gray',
  },
  itemTemp: {
    paddingHorizontal: 20,
  },
  textTemp: {
    fontSize: 30,
  },
  textMaxTemp: {
    fontWeight: 'bold',
  },
  textMinTemp: {
    color: 'gray',
  },
  containerItemInfo: {
    marginTop: 10,
  },
};

const ForecastItem = ({ item }) => {
  const [showInfo, setShowInfo] = useState(false);
  const numberToCelsius = (value) => {
    return `${value.toFixed(0)}°`;
  };

  return (
    <TouchableOpacity style={styles.item} onPress={() => setShowInfo(!showInfo)}>
      <View style={styles.itemHeader}>
        <View style={styles.itemDescription}>
          <Text style={styles.textDescriptionDate}>{moment(item.valid_date).format('dddd, D MMM')}</Text>
          <Text style={styles.textDescription}>{item.weather.description}</Text>
        </View>
        <View style={styles.itemTemp}>
          <Text style={styles.textTemp}>{numberToCelsius(item.temp)}</Text>
        </View>
        <View style={styles.itemMaxMinTemp}>
          <Text style={styles.textMaxTemp}>{numberToCelsius(item.max_temp)}</Text>
          <Text style={styles.textMinTemp}>{numberToCelsius(item.min_temp)}</Text>
        </View>
      </View>
      {showInfo && (
        <View style={styles.containerItemInfo}>
          <DataRow label="Humedad" value={`${item.rh}%`} />
          <DataRow label="Punto de rocío" value={`${numberToCelsius(item.dewpt)}`} />
          <DataRow label="Presión" value={`${item.pres.toFixed(1)} mbar`} />
          <DataRow label="Visibilidad" value={`${item.vis.toFixed(1)} km`} />
          <DataRow label="Viento" value={`${item.wind_spd.toFixed(1)}m/s ${item.wind_cdir_full}`} />
          <DataRow label="Índice UV" value={`${item.uv.toFixed(0)}`} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ForecastItem;
