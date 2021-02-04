import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';
import * as Facebook from 'expo-facebook';
import { connect } from 'react-redux'
import { setFbUser } from '../../store/actions/facebookUserAction' 
import * as Google from 'expo-google-app-auth';
import { firebase } from '../../config/firebase'
import SignInButton from '../../components/signInCustomButton'
import SignUpButton from '../../components/signUpCustomButton'
import GoogleButton from '../../components/googleCustomButton'
import FacebookButton from '../../components/facebookCustomButton'
import GoogleImg from '../../../assets/google.png'
import Logo from '../../../assets/blood3.png'


function FacebookLogin(props) {

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '360590444994505',
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

        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {

            firebase.firestore().collection('User')
            .where('id', '==',data.id)
            .get()
            .then(function(snaps){
              let foundChatroom1 = false
              let foundedDocId = []
              snaps.forEach(doc =>{
                foundChatroom1 = true
                foundedDocId.push(doc.data().name,doc.data().id, doc.id)
              })
              if(foundChatroom1 == true)
              {
                props.onFbLogin({
                  docId: foundedDocId[2],
                  userId : foundedDocId[1],
                  name : foundedDocId[0]
                })
                props.navigation.navigate("Home")
              } 
              else{
                   firebase.firestore().collection('User')
                  .add({
                    id: data.id,
                    name : data.name,
                    phoneNumber: 'Phone number',
                    bloodGroup: 'Blood Group',
                    health: 'Health',
                    category: 'Category',
                    picture: data.picture.data.url,
                    lat: '',
                    long: '',
                    place: '',
                    DOB : '',
                  }).then(doc => {
                    props.onFbLogin({
                      docId: doc.id,
                      userId : data.id,
                      name : data.name
                    })
                    props.navigation.navigate("Home")
                  })    
                }   
            })
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: '275181149102-9u32e4fvf3iqfnj0e3ke2gf015ohk03g.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
         firebase.firestore().collection('User')
          .where('id', '==',result.user.id)
          .get()
          .then(function(snaps){
            let foundChatroom1 = false
            let foundedDocId = []
            snaps.forEach(doc =>{
              foundChatroom1 = true
              foundedDocId.push(doc.data().name,doc.data().id, doc.id)
            })
            if(foundChatroom1 == true)
            {
              props.onFbLogin({
                docId: foundedDocId[2],
                userId : foundedDocId[1],
                name : foundedDocId[0],
                logout: false
              })
              props.navigation.navigate("Home")
            } 
            else{
              firebase.firestore().collection('User')
              .add({
                id: result.user.id,
                name : result.user.name,
                phoneNumber: 'Phone number',
                bloodGroup: 'Blood Group',
                health: 'Health',
                category: 'Category',
                picture: result.user.photoUrl,
                lat: '',
                long: '',
                place: '',
                DOB : ''
              }).then(doc => {
                  props.onFbLogin({
                    docId: doc.id,
                    userId : result.user.id,
                    name : result.user.name,
                    logout: false
                  })
                  props.navigation.navigate("Home")
                })    
            }   
          })
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      alert(`Google Login Error: ${e.message}`);
    }
  }

    return (
        <View style={styles.container}>
          <Text style={styles.headr1}>Blood</Text>
          <Image source={Logo} style={styles.pic}/>
          <Text style={styles.heading}>Welcome</Text>
          <Text style={styles.para1}>Blood is an online tracking app where you can track blood donors or acceptors. Login now to use this service.</Text>
          <View style={{flexDirection: "row", marginTop: 30}}>
            <SignInButton text='Sign in' color="#FFFCFC" onPress={() => props.navigation.navigate('Sign In')}/>
            <View style={{marginLeft: 11}}>
              <SignUpButton text='Sign Up' onPress={() => props.navigation.navigate('Sign Up')} color="#FFFCFC" />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <GoogleButton text='Sign Up with google' color="#FFFCFC" onPress={() => signInWithGoogle()}/>
            <Image source={GoogleImg} style={styles.google}/>
            <View style={{marginTop: 10}}>
              <FacebookButton text='Sign Up with facebook' color="#5768FF" onPress={() => facebookLogIn()}/>
              <Text style={{fontWeight: 'bold', marginTop: 12, marginLeft: 20, fontSize: 25, color: 'white', position: "absolute"}}>f</Text>
            </View>
          </View>
        </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:2,
      backgroundColor: '#fff',
      alignItems: 'center',
      width: null,
      height: null,
    },
    pic:{
      width: 200,
      height: 240,
      marginTop: 40
    },
    heading:{
      fontSize: 25,
      fontWeight: 'bold',
      color: '#565353',
      marginTop: 25
    },
    para1:{
      color: '#565353',
      marginTop: 10,
      paddingLeft: 60,
      paddingRight: 60,
      textAlign:"center"
    },
    google:{
      marginTop: 11,
      marginLeft: 13,
      position: "absolute"
    },
    headr1:{
      color:'#cd0000',
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 37
    },
  });

const mapDispatchToProps = (dispatch) =>{   
  return{
      onFbLogin : (user) => dispatch(setFbUser(user)),
    }
}


export default connect(null, mapDispatchToProps)(FacebookLogin)


        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    
      