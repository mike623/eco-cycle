import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("item").address_en,
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
    const latitude = this.props.navigation.getParam('item').lat;
    const longitude = this.props.navigation.getParam('item').lgt;
    return (
      <MapView
        style={{ flex: 1 }}
        // minZoomLevel={15}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title={this.props.navigation.getParam("item").address_en}
        description={this.props.navigation.getParam("item").waste_type}
      />
      </MapView>
    )
  }
}
