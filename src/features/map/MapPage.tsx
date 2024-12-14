import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

export default function MapPage() {
  return (
    <MapView
      initialRegion={{
        latitude: 35.91395373474155,
        longitude: 127.73829440215488,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
      style={[styles.map]}
      showsUserLocation={true}
      showsMyLocationButton={true}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
