import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button , KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { firebase } from '../../config/firebase'
import { Avatar } from 'react-native-paper';
import { ScrollView, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backGround from '../../../assets/bg.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';




function Chat(props) {

    const route = useRoute();

    const {  userId, userPic, userName, docId } = route.params
    const [messages, setMessages] = useState('')
    const [allMessages, setAllMessages] = useState('')
    const [sendButton, setSendButton] = useState(false)
    myTextInput = React.createRef()

    
    useEffect(() => {
      renderMessages()
    },[])


    const renderMessages = () =>{
 
      firebase.firestore().collection('chatroom').doc(docId).collection('messages') 
      .orderBy("timestamp", "asc")
      .onSnapshot(snaps =>{
        const tempMessages = []
        snaps.forEach(doc => {

          const data = doc.data()
          tempMessages.push(data)
        })
        console.log('list', userId)
        setAllMessages(tempMessages)
      })
    }

    const sendMessageToCloud = () =>
    {
        firebase.firestore().collection('chatroom').doc(docId).collection('messages').add({
          messages,
          userid : props.fbUser.userId,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()   
        }).then(
          myTextInput.current.clear(),
          setMessages('')
        )
    }
    return(
        <View style={styles.container}>
          <Image source={backGround} style={styles.backgroundImage}/>
          <ScrollView style={{marginTop: '15%'}}>
              {allMessages ? 
              (
                allMessages.map((item, index) => {
                  return(
                    <View key={index} style={{alignItems: item.userid === props.fbUser.userId ? "flex-end": "flex-start", marginTop: '10%'}} >
                      <Text style={{color: 'white', fontSize: 20, borderWidth: 1, borderColor: '#075E54', backgroundColor: '#075E54', borderRadius: 22, overflow: "hidden", height: 45, padding: '3%', }}>{item.messages}</Text>
                    </View>
                  )
                })
              ) : (
                <Text></Text>
              )
                
              }
          </ScrollView>
          <View style={{position: "absolute",  width: 400,  padding: 10, top: -5 , height: 70, backgroundColor: '#d62727',borderTopColor: '#d62727'}}>
           <View style={{left: '3%', top: '10%'}}>
              <Avatar.Image
                source={{uri: userPic}}
                size={45}
              />
            </View>
            <View style={{top: '-105%', left: '20%'}}>
              <Text style={{fontSize: 22,fontWeight : '500', color: 'white', top: '100%'}}>{userName}</Text>
            </View>
          </View>
          <KeyboardAvoidingView style={{  flexDirection: 'row', justifyContent: 'center', backgroundColor: '#292929', position: 'relative' }} behavior="padding" enabled keyboardVerticalOffset={60} >
            {messages ? 
            (
              <View style ={{ padding: 10, flexDirection:"row", justifyContent: "space-between"}}>
                <TextInput 
                  placeholder = "enter messages" 
                  placeholderTextColor="#FFF"
                  onChange={(e)=> setMessages(e.nativeEvent.text)}  
                  ref={myTextInput}
                  style={{backgroundColor: '#525252',color: 'white', height: 35,  width: '85%', borderRadius: 35, textAlign: "center", }}/>
                <View style={{flexDirection: 'row', alignItems: "flex-end", borderWidth: 1, borderColor: '#a1221d', backgroundColor: '#a1221d', borderRadius: 40, padding: 4}}>
                  <MaterialCommunityIcons
                    name="send"
                    color='white'
                    size={25}
                    onPress={sendMessageToCloud}
                  />
                </View>

              </View>
            ): (
              <View style ={{ padding: 10, flexDirection:"row", justifyContent: "space-between"}}>
                <TextInput 
                placeholder = "enter messages" 
                placeholderTextColor="#FFF"
                onChange={(e)=> setMessages(e.nativeEvent.text)}  
                style={{backgroundColor: '#525252',color: 'white', height: 35,  width: '95%', borderRadius: 35, textAlign: "center", }}/>
              </View>

            )}
          </KeyboardAvoidingView>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover', 
    position: "absolute"
  }
});


const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
    goglUser: state.googleUserReducer.user,
  }
}


export default connect(mapStateToProps, null)(Chat)


