import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView } from 'react-native';
import CustomButtonForApp from '../../components/customButton'
import { authenticateUserLogin, firebase } from '../../config/firebase'
import { connect } from 'react-redux'
import { setFbUser } from '../../store/actions/facebookUserAction' 



function SignIn(props) {

   const [email,setEmail] = useState(null)
   const [password,setPassword] = useState(null)


  const signIn = async() =>
  {
    try{
      const response = await authenticateUserLogin(email, password)
      firebase.firestore().collection('User')
      .where('id', '==', response.user.uid)
      .get()
      .then(snaps => {
        snaps.forEach(doc => {
          console.log('doc ---->', doc.id)
          props.onFbLogin({
            docId: doc.id,
            userId : doc.data().id,
            name : doc.data().name
          }).then(
            Alert.alert(
              "Sign in",
              "Successfully sign in!",
              [
                { text: "OK", onPress: () => props.navigation.navigate("Home") }
              ],
              { cancelable: false }
            )
            )
        })
    })
  }
    catch(e){
      Alert.alert(
        "Error",
        `${e.message}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.signUpFoam}>
            <View style={styles.signUpAllFields}>
              <Text style={styles.signUpInputLabels}>Email address</Text>
              <TextInput placeholder = "email" onChange={(e)=> setEmail(e.nativeEvent.text)} style={styles.signUpInputs} returnKeyType="next" onSubmitEditing={() => { secondTextInput.focus(); }} blurOnSubmit={false}/>
            </View>
            <View style={{borderWidth: 1, borderColor: '#6F1FF9', width: 4, height: 39, borderRadius: 4, backgroundColor: '#6F1FF9', marginLeft: -2, marginTop: 75, position: 'absolute'}}></View>
            <View style={styles.signUpAllFields}>
              <Text style={styles.signUpInputLabels}>Password</Text>
              <TextInput placeholder = "password" secureTextEntry={true}  onChange={(e)=> setPassword(e.nativeEvent.text)} style={styles.signUpInputs} ref={(input) => { secondTextInput = input; }}/>
            </View>
            <View style={{alignItems: 'center', marginLeft: -45, marginTop: 50}}>
              <CustomButtonForApp text='SIGN IN' color="#d91523" width= 'large' onPress={signIn}/>
            </View>
            <View style={{borderWidth: 1, borderColor: '#FFD03D', width: 4, height: 39, borderRadius: 4, backgroundColor: '#FFD03D', marginLeft: -2, marginTop: 155, position: 'absolute'}}></View>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  signUpFoam:{
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#F8F8F8',
    width: 300,
    height: 320,
    paddingTop: 60,
    paddingLeft: 45,
    shadowColor: "#dedede",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 20,
    shadowRadius: 8,
    elevation: 9,
    borderRadius: 8,
    marginTop: 120,
  },
  signUpAllFields:{
    marginBottom: 10
  },
  signUpInputLabels:{
    
    color:'#6B6B6B',
    fontSize: 15,
    marginBottom: 5

  },
  signUpInputs:{
    borderWidth: 1,
    borderColor: '#F6F6F6',
    width: 220,
    height: 42,
    borderRadius: 6, 
    backgroundColor: '#FCFCFC',
    textAlign: "center",
    color: 'grey',
  }
 
});


const mapDispatchToProps = (dispatch) =>{   
  return{
      onFbLogin : (user) => dispatch(setFbUser(user)),
    }
}


export default connect(null, mapDispatchToProps)(SignIn)


