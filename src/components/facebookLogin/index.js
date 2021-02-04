import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';


export default class FacebookLogin extends React.Component {

    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
      }
  async logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '819742282134377',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert(
            "Logged in!",`Hi ${(await response.json()).name}!`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
            ],
            { cancelable: false }
          );
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        // this.props.navigation.navigate('Home')
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  
  render()
  {
    return (
      <View style={styles.container}>
        <Button
        style={{fontSize: 20, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={this.logIn}
        title="Login with facebook"
        />     
        <StatusBar style="auto" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
