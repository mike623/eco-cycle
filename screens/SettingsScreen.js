import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MonoText } from "../components/StyledText";

const Item = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View backgroundColor='white' paddingVertical={16} paddingHorizontal={32}>
      <MonoText>{children}</MonoText>
    </View>
  </TouchableOpacity>
);

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  _check =  async () => {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        // ... notify user of update ...
        Expo.Updates.reloadFromCache();
      } else {
        alert('update to date!')
      }
    } catch (e) {
      alert(e.message)
      // handle or log error
    }
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View flex={1} backgroundColor='white'>
        <Item onPress={this._check}>check update</Item>
        <View marginLeft={32} width='100%' height={1} backgroundColor='#D9D9D9'/>
        <Item>by: Mike Wong</Item>
      </View>
    );
  }
}
