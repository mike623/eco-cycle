import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar
} from "react-native";
import ElevatedView from "react-native-elevated-view";

import { MonoText } from "../components/StyledText";
const Text = p => (
  <MonoText
    {...p}
    style={{ fontWeight: "bold", fontSize: 30, color: p.color || "white", ...p.style }}
  />
);
const Item = ({ children, color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      paddingVertical={60}
      flex={1}
      justifyContent="center"
      flexDirection="row"
      backgroundColor={color}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    type: "Any",
    district: "Any"
  };

  onSelect = type => value => this.setState({ [type]: value });

  render() {
    return (
      <SafeAreaView backgroundColor="#2EBCD0" style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#2EBCD0" />
        <ScrollView
          backgroundColor="#fff"
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Item
            onPress={() =>
              this.props.navigation.navigate("Selection", {
                type: "TYPE",
                onSelect: this.onSelect("type")
              })
            }
            color="#2EBCD0"
          >
            <View alignItems="center" flexDirection="column">
              <Text>TYPE</Text>
              <Text style={{textAlign: 'center', fontSize: 20}}>{this.state.type}</Text>
            </View>
          </Item>
          <Item
            onPress={() =>
              this.props.navigation.navigate("Selection", {
                type: "DISTRICT",
                onSelect: this.onSelect("district")
              })
            }
            color="#47C9DA"
          >
          <View alignItems="center" flexDirection="column">
            <Text>DISTRICT</Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>{this.state.district.replace(/_/gi, ' ')}</Text>
            </View>
          </Item>
        </ScrollView>
        <View
          padding={30}
          backgroundColor="white"
          justifyContent="center"
          flexDirection="row"
        >
          <TouchableOpacity onPress={() =>
              this.props.navigation.navigate("SearchPage", {
                type: this.state.type,
                district: this.state.district
              })}>
            <ElevatedView
              backgroundColor="white"
              paddingVertical={8}
              paddingHorizontal={40}
              elevation={10}
            >
              <Text style={{fontSize: 24}} color="#2EBCD0">SEARCH</Text>
            </ElevatedView>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    flexDirection: "column"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#1A1A1A",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
