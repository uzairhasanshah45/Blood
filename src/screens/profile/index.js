import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Platform, Button, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import bitemogi from '../../../assets/uzair.jpg'
import { Picker } from '@react-native-community/picker'
import { connect } from 'react-redux'
import CustomButton from '../../components/customButton'
import { setFbUser } from '../../store/actions/facebookUserAction' 
import { firebase, getData  } from '../../config/firebase'




function Profile(props) {


  const [image, setImage] = useState(null)
  const [bloodGroup, setBloodGroup] = useState('')
  const [health, setHealth] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
      getImagePermission()
      userData()
  }, []);

  const userData = async () => {
    
    firebase.firestore().collection('User').doc(props.fbUser.docId).get().then(function(doc){
      const data = doc.data()

      setName(data.name)
      setPhoneNumber(data.phoneNumber)
      setBloodGroup(data.bloodGroup)
      setHealth(data.health)
      setCategory(data.category)
      setImage(data.picture)
      if(data.DOB != '')
      {
        const splitDOB =  data.DOB.split("-")
        setDate(splitDOB[0])
        setMonth(splitDOB[1])
        setYear(splitDOB[2])
      }
    })
  }

  const getImagePermission = async() =>{

    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
  }
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      firebase.firestore().collection('User')
      .doc(props.fbUser.docId)
      .set({
       picture: result.uri
      },{ merge: true })  
    }
  };

  const updateProfile = () =>{
    firebase.firestore().collection('User')
    .doc(props.fbUser.docId)
    .set({
      name,
      phoneNumber,
      bloodGroup,
      health,
      category,
      picture: image,
      DOB : date + '-' + month + '-' + year,
    },{ merge: true })  
  }


  return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{ flex: 2,  justifyContent: 'center', flexDirection: 'column'}}>
            <View style={{flexDirection: 'column', alignItems: "center"}}>
                <Image source={{uri : image ? image : 'waiting'}} style={styles.profileImg} />
                <Button title="Edit profile Picture" onPress={pickImage} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: 45}}>
                <Text style={{fontSize: 20}}>Name:</Text>
                <TextInput placeholder={name} onChange={(e)=> setName(e.nativeEvent.text)} style={{borderBottomWidth: 1, borderColor: 'grey', width: 250, height: 30, textAlign: 'center', borderRadius: 4, fontSize: 20, color: 'black'}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: 35, marginBottom: '10%'}}>
                <Text style={{fontSize: 20}}>Phone No:</Text>
                <TextInput placeholder={phoneNumber} keyboardType='numeric' onChange={(e)=> setPhoneNumber(e.nativeEvent.text)} style={{borderBottomWidth: 1, borderColor: 'grey', width: 250, height: 30, textAlign: 'center', borderRadius: 4, fontSize: 20}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '10%', borderTopWidth: 1, borderColor: 'grey'}}>
                <Picker
                selectedValue={bloodGroup}
                    style={{height: 50, width: 300, marginTop: '5%'}}
                    onChange={(e)=> setBloodGroup(e.nativeEvent.text)}
                    onValueChange={(itemValue, itemIndex) =>
                        setBloodGroup(itemValue)
                    }>
                    <Picker.Item label="Blood Group" value="Blood Group" style={{color: 'red'}}/>    
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="AB-" value="AB-" />
                </Picker>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around',marginTop: '50%', borderTopWidth: 1, borderColor: 'grey'}}>
                <Picker
                selectedValue={health}
                    style={{height: 50, width: 300, marginTop: '5%', marginBottom: '7%'}}
                    onChange={(e)=> setHealth(e.nativeEvent.text)}
                    onValueChange={(itemValue, itemIndex) =>
                        setHealth(itemValue)
                    }>
                    <Picker.Item label="Health" value="Health"/>    
                    <Picker.Item label="100" value="100" />
                    <Picker.Item label="90" value="90" />
                    <Picker.Item label="80+" value="80" />
                    <Picker.Item label="70" value="70" />
                    <Picker.Item label="60" value="60" />
                    <Picker.Item label="50" value="50" />
                </Picker>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around',marginTop: 150, borderTopWidth: 1, borderColor: 'grey'}}>
                <Picker
                selectedValue={category}
                    style={{height: 50, width: 300, marginTop: '5%', marginBottom: '7%'}}
                    onChange={(e)=> setCategory(e.nativeEvent.text)}
                    onValueChange={(itemValue, itemIndex) =>
                        setCategory(itemValue)
                    }>
                    <Picker.Item label="Category" value="Category"/>    
                    <Picker.Item label="Donor" value="Donor" />
                    <Picker.Item label="Acceptor" value="Acceptor" />
                </Picker>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center',marginTop: 150, borderTopWidth: 1, borderColor: 'grey'}}>
              <View style={{marginTop: '6%', flexDirection: 'row', marginBottom: '6%'}}>
                <View style={{paddingRight: 40}}>
                      <Picker
                      selectedValue={date}
                          style={{height: 50, width: 50}}
                          onChange={(e)=> setDate(e.nativeEvent.text)}
                          onValueChange={(itemValue) =>
                              setDate(itemValue)
                          }>
                          <Picker.Item label="Date" value="Date" style={{color: 'red'}}/>    
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                          <Picker.Item label="7" value="7" />
                          <Picker.Item label="8" value="8" />
                          <Picker.Item label="9" value="9" />
                          <Picker.Item label="10" value="10" />
                          <Picker.Item label="11" value="11" />
                          <Picker.Item label="12" value="12" />
                          <Picker.Item label="13" value="13" />
                          <Picker.Item label="14" value="14" />
                          <Picker.Item label="15" value="15" />
                          <Picker.Item label="16" value="16" />
                          <Picker.Item label="17" value="17" />
                          <Picker.Item label="18" value="18" />
                          <Picker.Item label="19" value="19" />
                          <Picker.Item label="20" value="20" />
                          <Picker.Item label="21" value="21" />
                          <Picker.Item label="22" value="22" />
                          <Picker.Item label="23" value="23" />
                          <Picker.Item label="24" value="24" />
                          <Picker.Item label="25" value="25" />
                          <Picker.Item label="26" value="26" />
                          <Picker.Item label="27" value="27" />
                          <Picker.Item label="28" value="28" />
                          <Picker.Item label="29" value="29" />
                          <Picker.Item label="30" value="30" />
                          <Picker.Item label="31" value="31" />
                      </Picker>
                  </View>
                  <View style={{paddingRight: 10}}>
                      <Picker
                      selectedValue={month}
                          style={{height: 50, width: 80}}
                          onChange={(e)=> setMonth(e.nativeEvent.text)}
                          onValueChange={(itemValue) =>
                              setMonth(itemValue)
                          }>
                          <Picker.Item label="Month" value="Month"/>    
                          <Picker.Item label="01" value="01" />
                          <Picker.Item label="02" value="02" />
                          <Picker.Item label="03" value="03" />
                          <Picker.Item label="04" value="04" />
                          <Picker.Item label="05" value="05" />
                          <Picker.Item label="06" value="06" />
                          <Picker.Item label="07" value="07" />
                          <Picker.Item label="08" value="08" />
                          <Picker.Item label="09" value="09" />
                          <Picker.Item label="10" value="10" />
                          <Picker.Item label="11" value="11" />
                          <Picker.Item label="12" value="12" />
                      </Picker>
                  </View>
                  <View style={{paddingLeft: 20}}>
                      <Picker
                      selectedValue={year}
                          style={{height: 50, width: 80}}
                          onChange={(e)=> setYear(e.nativeEvent.text)}
                          onValueChange={(itemValue) =>
                              setYear(itemValue)
                          }>
                          <Picker.Item label="Year" value="Year"/>    
                          <Picker.Item label="2020" value="2020" />
                          <Picker.Item label="2019" value="2019" />
                          <Picker.Item label="2018" value="2018" />
                          <Picker.Item label="2017" value="2017" />
                          <Picker.Item label="2016" value="2016" />
                          <Picker.Item label="2015" value="2015" />
                          <Picker.Item label="2014" value="2014" />
                          <Picker.Item label="2013" value="2013" />
                          <Picker.Item label="2012" value="2012" />
                          <Picker.Item label="2011" value="2011" />
                          <Picker.Item label="2010" value="2010" />
                          <Picker.Item label="2009" value="2009" />
                          <Picker.Item label="2008" value="2008" />
                          <Picker.Item label="2007" value="2007" />
                          <Picker.Item label="2006" value="2006" />
                          <Picker.Item label="2005" value="2005" />
                          <Picker.Item label="2004" value="2004" />
                          <Picker.Item label="2003" value="2003" />
                          <Picker.Item label="2002" value="2002" />
                          <Picker.Item label="2001" value="2001" />
                          <Picker.Item label="2000" value="2000" />
                          <Picker.Item label="1999" value="1999" />
                          <Picker.Item label="1998" value="1998" />
                          <Picker.Item label="1997" value="1997" />
                          <Picker.Item label="1996" value="1996" />
                          <Picker.Item label="1995" value="1995" />
                          <Picker.Item label="1994" value="1994" />
                          <Picker.Item label="1993" value="1993" />
                          <Picker.Item label="1992" value="1992" />
                          <Picker.Item label="1991" value="1991" />
                          <Picker.Item label="1990" value="1990" />
                      </Picker>
                  </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around',marginTop: 190, marginBottom: 50}}>
              <CustomButton text='UPDATE' onPress={updateProfile} width = 'large' height = 'large' top = 'up' color="#6f3ac9" borderColor="#5768FF"/>
            </View>            
        </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
      profileImg: {
        width: 120,
        height: 120,
        borderRadius: 150 / 2,
        marginBottom: 10,
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'white'
      },
});



const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
  }
}

const mapDispatchToProps = (dispatch) =>{   
  return{
      onFbLogin : (user) => dispatch(setFbUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
