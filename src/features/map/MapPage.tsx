import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_KEY} from '@env';
import {PermissionsAndroid} from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function MapPage() {
  useEffect(() => {
    requestLocationPermission();
  }, []);

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
    <View style={styles.view}>
      <View style={styles.searchView}>
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
      </View>
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
  view: {
    flex: 1,
    flexDirection: 'column',
  },
  searchView: {
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    color: '#5d5d5d',
    fontSize: 16,
  },
});
