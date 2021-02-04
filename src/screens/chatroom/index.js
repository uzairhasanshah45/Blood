import { StatusBar } from 'expo-status-bar';
import { convertSpeed } from 'geolib';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { firebase } from '../../config/firebase'
import { connect, connectAdvanced } from 'react-redux'
import { Avatar } from 'react-native-paper';
import CustomButton from '../../components/customButton'




function Notification(props){

  const [user, setUser] = useState([])
  const [cahttedUsers, setChattedUsers] = useState('')

  useEffect(() => {
    getChatroom()
  },[])

  const getChatroom = () => {

    firebase.firestore().collection('chatroom')
    .onSnapshot(snaps => {

      const chat = []
      snaps.forEach(doc => {

        const data = doc.data()

        if(data.user1 == props.fbUser.userId && data.user2 != props.fbUser.userId)
        {
          chat.push(data.user2)
        }
        else if (data.user1 != props.fbUser.userId && data.user2 == props.fbUser.userId){
          chat.push(data.user1)
        }
      })
      if(chat)
      {        
        setChattedUsers(chat)
        firebase.firestore().collection('User')
        .get()
        .then(snaps => {

          const users = []
          snaps.forEach(doc => {

            users.push(doc.data())
          })
          const finalUsers = []
          for(var i=0; i<chat.length; i++)
          {
            for(var j=0; j<users.length; j++)
            {
              if(users[j].id == chat[i])
              {
                finalUsers.push(users[j])
              }
            }
          }
         setUser(finalUsers)
        })
      }
    })

  }



    return(
        <View style={styles.container}>
          <ScrollView style={{marginTop: '10%'}}>
            {user != '' ? 
            ( user.map((item, index) => {
                return (
                      <View style={styles.usersInfo} key={index}>
                          <Avatar.Image
                            source={{uri: item.picture}}
                            size={50}
                            onPress={() => console.log('Pressed')}
                          />
                        <Text style={{fontSize: 21, fontWeight: '400', textAlign: "center", top: '40%', left: '35%', position: "absolute", color: 'white'}}>{item.name}</Text>
                        {/* <Text style={{fontSize: 21, fontWeight: '400', textAlign: "center", top: '72%', left: '35%', position: "absolute"}}>{item.bloodGroup}</Text> */}
                        <Text style={{fontSize: 21, fontWeight: '400', textAlign: "center", top: '85%', left: '35%', position: "absolute", color: 'white'}}>{item.category}</Text>
                        <View style={{position: "absolute", marginLeft: '70%', marginTop: '20%'}}>
                          <CustomButton text='View' color="white" txtColor='black' borderColor='white' onPress={() =>  props.navigation.navigate('User Profile',{id : item.id})}/>
                          
                        </View>
                      </View> 
                )
                })) 
                : 
              (
                <Text style={{justifyContent: "center", fontSize: 20, marginTop: '350%', alignItems: "center", textAlign: "center", flex: 1}}> No Users.... </Text>
                )
            }
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
  usersInfo: {
    flex: 1,
    borderWidth: 1,
    // borderColor: '#f8f8f8',
    // backgroundColor: '#fff', 
    backgroundColor: '#d91523',
    borderColor: '#d91523',
    padding: 20, 
    width: 320, 
    height: 100,
    borderRadius: 8, 
    shadowColor: "#f2f2f2",
      shadowOffset: {
        width: 0,
        height: 0
      },
    shadowOpacity: 20,
    shadowRadius: 8,
    elevation: 30,
    marginTop: '2%',
  }
});


const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
    goglUser: state.googleUserReducer.user,
  }
}


export default connect(mapStateToProps, null)(Notification)

