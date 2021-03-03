import React, { useState, useEffect } from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import WeatherService from 'services/WeatherService';

import LoadingScreen from 'components/LoadingScreen';
import ScreenError from 'components/ScreenError';
import Icon from 'components/Icon';
import ModalSearchItem from 'components/ModalSearchItem';
import Modal from 'components/Modal';
import TodayScreen from './Today';
import ForecastScreen from './Forecast';

const initialLayout = { width: Dimensions.get('window').width };

const styles = {
  containerSearch: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSearch: {
    flex: 1,
  },
  icon: {
    color: '#000',
    fontSize: 20,
    marginLeft: 10,
  },
  tabBar: {
    indicatorStyle: {
      backgroundColor: '#000',
    },
    style: {
      backgroundColor: '#f2f2f2',
    },
  },
};

const SEARCH_OPTIONS = [
  { city: 'Montevideo', country: 'Uruguay' },
  { city: 'Asunción', country: 'Paraguay' },
  { city: 'Santiago', country: 'Chile' },
  { city: 'Caracas', country: 'Venezuela' },
  { city: 'Lima', country: 'Peru' },
];

const Home = () => {
  const [search, setSearch] = useState({ city: 'Buenos Aires', country: 'Argentina' });
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [routes] = useState([
    { key: 'today', title: 'Hoy' },
    { key: 'forecast', title: '5 días' },
  ]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await WeatherService.getLocation();
        setSearch({ city: response.city, country: response.country });
        setLocation({ city: response.city, country: response.country });
        setLoading(false);
      } catch (err) {
        if (typeof err === 'object') {
          setError(err?.message || 'Error in location');
        } else {
          setError(err || 'Error in location');
        }
        setLoading(false);
      }
    })();
  }, []);

  const renderScene = SceneMap({
    today: () => <TodayScreen search={search} />,
    forecast: () => <ForecastScreen search={search} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar.indicatorStyle}
      style={styles.tabBar.style}
      activeColor="#000"
      inactiveColor="gray"
    />
  );

  const onSelectLocation = (value) => {
    setSearch(value);
    setModalVisible(!modalVisible);
  };

  if (error) {
    return <ScreenError content={error} />;
  }

  if (loading || !search) {
    return <LoadingScreen />;
  }

  return (
    <>
      <TouchableOpacity style={styles.containerSearch} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textSearch}>{`${search.city}, ${search.country}`}</Text>
        <Icon name="magnify" style={styles.icon} />
      </TouchableOpacity>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <Modal title="Lugares" modalVisible={modalVisible} onClose={() => setModalVisible(!modalVisible)}>
        <>
          <ModalSearchItem location={location} description="Tu ubicación" onSelect={() => onSelectLocation(location)} />
          {SEARCH_OPTIONS.map((item) => {
            const itemLocation = { city: item.city, country: item.country };
            return (
              <ModalSearchItem
                key={item.city}
                location={itemLocation}
                onSelect={() => onSelectLocation(itemLocation)}
              />
            );
          })}
        </>
      </Modal>
    </>
  );
};

export default Home;
