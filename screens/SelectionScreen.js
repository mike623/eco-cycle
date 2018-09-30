// import SearchList from "@unpourtous/react-native-search-list";
import React, { Component } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";

const selections = {
  TYPE: [
    "Any",
    "Barbeque Fork",
    "Clothes",
    "Computers",
    "Electrical and Electronic Equipment",
    "Fluorescent Lamp",
    "Glass Bottles",
    "Metals",
    "Paper",
    "Plastics",
    "Printer Cartridges",
    "Rechargeable Batteries"
  ],
  DISTRICT: [
    "Any",
    "Central_Western",
    "Eastern",
    "Islands",
    "Kowloon_City",
    "Kwai_Tsing",
    "Kwun_Tong",
    "North",
    "Sai_Kung",
    "Sha_Tin",
    "Sham_Shui_Po",
    "Southern",
    "Tai_Po",
    "Tsuen_Wan",
    "Tuen_Mun",
    "Wan_Chai",
    "Wong_Tai_Sin",
    "Yau_Tsim_Mong",
    "Yuen_Long"
  ]
};

import { MonoText } from "../components/StyledText";

export default class SelectionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("type", "A Nested Details Screen"),
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

  _select = searchStr => () => {
    this.props.navigation.getParam("onSelect")(searchStr);
    this.props.navigation.pop();
  };

  _row = ({ item }) => (
    <TouchableOpacity onPress={this._select(item.searchStr)}>
      <View
        justifyContent="center"
        flexDirection="row"
        width="100%"
        paddingVertical={16}
      >
        <MonoText style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {item.searchStr.replace(/_/gi, ' ')}
        </MonoText>
      </View>
    </TouchableOpacity>
  );

  render() {
    const d = selections[this.props.navigation.getParam("type")];
    const k = d.map(i => ({ searchStr: i }));
    return (
      <View backgroundColor="#1A1A1A" flex={1}>
        {/* <SearchList renderBackButton={()=> null} renderRow={this._row} data={k} /> */}
        <FlatList
          data={k}
          renderItem={this._row}
          keyExtractor={i => i.searchStr}
        />
      </View>
    );
  }
}
