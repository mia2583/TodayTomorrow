import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_KEY} from '@env';

export default function MapPage() {
  const [region, setRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  return (
    <View style={styles.map}>
      <GooglePlacesAutocomplete
        placeholder="장소 검색"
        fetchDetails={true} // 장소 세부정보
        onPress={(data, details = null) => {
          if (details) {
            const {lat, lng} = details?.geometry.location;
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            setMarker({
              latitude: lat,
              longitude: lng,
            });
          }
        }}
        query={{
          key: GOOGLE_MAP_KEY,
          language: 'en',
        }}
        currentLocation={true}
        onFail={error => console.log(error)}
        styles={{
          container: styles.searchContainer,
          textInput: styles.searchInput,
        }}
      />
      <MapView
        initialRegion={region}
        style={[styles.map]}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    color: '#5d5d5d',
    fontSize: 16,
  },
});
