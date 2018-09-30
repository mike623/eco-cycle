import React, { Component } from "react";
import { FlatList, View, Platform, TouchableOpacity, AsyncStorage } from "react-native";
import { MonoText } from "../components/StyledText";
const result = require("./waste.json");
import { Constants, Location, Permissions } from "expo";
import { Ionicons } from "@expo/vector-icons";
import xor from 'lodash.xor'

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

export default class SearchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam("type")} - ${navigation
        .getParam("district")
        .replace(/_/gi, " ")}`,
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
  state = {
    location: null,
    errorMessage: null,
    favs: []
  };

  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
    const favs = await AsyncStorage.getItem('app:favs') || '[]'
    this.setState({favs: JSON.parse(favs)})
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  _toggle = (cp_id) => async () => {
    const d = xor(this.state.favs, [cp_id])
    await AsyncStorage.setItem('app:favs', JSON.stringify(d))
    this.setState({favs: d})
  }
  _render = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate("Map", { item })}
    >
      <View paddingVertical={16} paddingHorizontal={32} position="relative">
        <View width="80%" flexDirection="column">
          <MonoText style={{ color: "#2EBCD0", fontSize: 24 }}>
            {item.address_tc}
          </MonoText>
          <MonoText>{item.address_en}</MonoText>
        </View>
        {!!this.state.location && (
          <View position="absolute" right={16} bottom={8}>
            <MonoText style={{ color: "#2EBCD0" }}>
              {distance(
                item.lat,
                item.lgt,
                this.state.location.coords.latitude,
                this.state.location.coords.longitude,
                "K"
              ).toFixed(2)}
              KM
            </MonoText>
          </View>
        )}
        <View position="absolute" top={8} right={16}>
          <TouchableOpacity onPress={this._toggle(item.cp_id)}>
            <Ionicons size={32} name={`md-heart${!!~this.state.favs.indexOf(item.cp_id)? '' : '-outline'}`} color='#2EBCD0' />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
    let res = result;
    const type = this.props.navigation.getParam("type");
    const district = this.props.navigation.getParam("district");
    if (type && type !== "Any") {
      res = res.filter(i => i.waste_type.includes(type));
    }
    if (district && district !== "Any") {
      res = res.filter(i => i.district_id.includes(district));
    }
    return (
      <View flex={1} backgroundColor="white">
        <FlatList
          initialNumToRender={20}
          data={res}
          renderItem={this._render}
          keyExtractor={i => `${i.cp_id}`}
          extraData={this.state}
          ItemSeparatorComponent={() => (
            <View
              marginLeft={32}
              height={1}
              width="100%"
              backgroundColor="#2EBCD0"
            />
          )}
        />
        {/* <MonoText>{res.length}</MonoText> */}
        {/* <MonoText>{JSON.stringify(this.state.location)}</MonoText> */}
      </View>
    );
  }
}
