import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux'
import { firebase } from '../../config/firebase'
import { Avatar } from 'react-native-paper';
import CustomButton from '../../components/customButton'
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';



function UsersProfile(props) {

    const route = useRoute();

    const {  id } = route.params;


    const [bloodGroup, setBloodGroup] = useState('')
    const [category, setCategory] = useState('')
    const [health, setHealth] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [picture, setPicture] = useState('')
    const [place, setPlace] = useState('')

    useEffect(() => {    
      getUserInfo()
    },[id])

    const getUserInfo = () => {

      firebase.firestore().collection('User')
      .where('id', '==', id)
      .get()
      .then(function(snaps) {

        snaps.forEach(function(doc)
        {
          const data = doc.data()

          setName(data.name)
          setBloodGroup(data.bloodGroup)
          setCategory(data.category)
          setHealth(data.health)
          setPhoneNumber(data.phoneNumber)
          setPicture(data.picture)
          setPlace(data.place)
        })
      })
    }

    const checkChatroom = () => {

      firebase.firestore().collection('chatroom')
      .where('user1', '==', props.fbUser.userId)
      .where('user2', '==', id)
      .get()
      .then(function(snaps){
        let foundChatroom1 = false
        snaps.forEach(doc =>{
          foundChatroom1 = true
          props.navigation.navigate('Chat',{userId : id, docId: doc.id, userPic : picture, userName : name})
        })
        if(foundChatroom1 == true)
        {
          console.log('first')
        } 
        else{

          firebase.firestore().collection('chatroom')
          .where('user2', '==', props.fbUser.userId)
          .where('user1', '==', id)
          .get()
          .then(function(snaps){
            snaps.forEach(doc =>{
              foundChatroom1 = true
              props.navigation.navigate('Chat',{userId : id, docId: doc.id, userPic : picture, userName : name})
            })
          })

          if(foundChatroom1 == true)
          {
            console.log('second')
          }
          else{
            console.log('kuch ni chala')
            firebase.firestore().collection('chatroom')
            .add({
              user1: props.fbUser.userId,
              user2: id
                    
            }).then(doc => {
              props.navigation.navigate('Chat',{userId : id, docId: doc.id, userPic : picture, userName : name})
            })         
          .catch(e => console.log(e))
          }
        }   
      })
    }

    return(
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.info}>
              <View style={{position: 'absolute', marginTop: 40, marginLeft: 30}}>
                <Avatar.Image
                 source={picture ? {uri: picture } : null}
                  size={80}
                />
              </View>
              <View style={{position: 'absolute', marginLeft: '40%', marginTop: '15%'}}>
                <Text style={{color: 'white', fontSize: 27}}>{name}</Text>
              </View>
              <View style={{marginTop: '27%', marginLeft: '40%'}}>
                <CustomButton text='Chat' color="#7bd126" borderColor='#7bd126' onPress={checkChatroom}/>
              </View>
              <View style={{position: "absolute", marginTop: '50%', padding: '5%'}}>
                <View style={{ flexDirection: "row", marginBottom: '6%'}}>
                  <Text style={{color: 'white', fontSize: 20}}> Blood Group </Text>
                  <View style={{borderBottomWidth: 1, borderColor: '#e0e0e0', width: 180 }}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center', paddingBottom: 10}}>{bloodGroup}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 20}}>
                  <Text style={{color: 'white', fontSize: 20}}> Health </Text>
                  <View style={{borderBottomWidth: 1, borderColor: '#e0e0e0', width: 180, marginLeft: 50}}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center', paddingBottom: 10}}>{health}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 20}}>
                  <Text style={{color: 'white', fontSize: 20}}> Category </Text>
                  <View style={{borderBottomWidth: 1, borderColor: '#e0e0e0', width: 180, marginLeft: 28}}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center', paddingBottom: 10}}>{category}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 20}}>
                  <Text style={{color: 'white', fontSize: 20}}> Location </Text>
                  <View style={{borderBottomWidth: 1, borderColor: '#e0e0e0', width: 180, marginLeft: 30}}>
                    <Text style={{color: 'white', fontSize: 20, paddingBottom: 10, textAlign: 'center'}}>{place}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row"}}>
                  <Text style={{color: 'white', fontSize: 20}}> Phone No </Text>
                  <View style={{borderBottomWidth: 1, borderColor: '#e0e0e0', width: 180, marginLeft: 20}}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center', paddingBottom: 10, }}>{phoneNumber}</Text>
                  </View>
                </View>
              </View>
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
    justifyContent: 'center',
  },
  info : {
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#cc1818', 
    width: 320, 
    height: 500, 
    marginTop: 30,    
    borderRadius: 12,
    shadowColor: "#e3e3e3",
      shadowOffset: {
        width: 0,
        height: 0
      },
    shadowOpacity: 20,
    shadowRadius: 8,
    elevation: 30,
    marginTop: '15%'
  }
});


const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
    goglUser: state.googleUserReducer.user,
  }
}


export default connect(mapStateToProps, null)(UsersProfile)


