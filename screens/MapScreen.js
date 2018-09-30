import React, { Component } from 'react'
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "A Nested Details Screen"),
      headerStyle: {
        backgroundColor: "#2EBCD0"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontFamily: "space-mono"
      }
    };
  };
  render() {
    const latitude = this.props.navigation.getParam('latitude');
    const longitude = this.props.navigation.getParam('longitude');
    return (
      <MapView
        style={{ flex: 1 }}
        minZoomLevel={13}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
      >
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title={this.props.navigation.getParam("title")}
        // description={marker.description}
      />
      </MapView>
    )
  }
}
