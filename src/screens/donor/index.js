import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from '../../config/firebase'
import { ScrollView, Image } from 'react-native';
import {
  Avatar
} from 'react-native-paper';
import CustomButton from '../../components/customButton'
import { connect } from 'react-redux'
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import DropDownPicker from 'react-native-dropdown-picker';




function Notification(props){

  const [users, setUsers] = useState(null)
  const [category, setCategory] = useState('Donor')
  const [l, setL] = useState('10')


  useEffect(() => {
    getDonors()
  },[category,l] )


  const getDonors =  async() =>{
    
    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});

     firebase.firestore().collection('User')
    .where('category', '==', category)
    .get()
    .then(function(snaps)
    {
      const list = []
      snaps.forEach(function(doc)
      {
          const data = doc.data()

          if(data.lat != '' && data.lng != '')
          {
            const dis =  getDistance(
              {latitude: data.lat, longitude: data.lng},
              {latitude: location.coords.latitude, longitude: location.coords.longitude},
            )
            data.distance = dis/1000

            if(data.distance <= l)
            {
              list.push(data) 
            }
          }
      })
      setUsers(list)
      
    })
  }


  
    return(
        <View style={styles.container}>
          <View style={{marginTop: '10%', flexDirection: "row", zIndex: 999}}>
            <View style={{width: '40%'}}>
              <DropDownPicker
                  items={[
                    {label: 'Donor', value: 'Donor'},
                    {label: 'Acceptor', value: 'Acceptor'},
                  ]}
                  defaultValue={category}
                  // placeholder="Select Category"
                  labelStyle={{color: 'white', textAlign: "center"}}
                  arrowColor='white'
                  containerStyle={{height: 40, color: 'white'}}
                  style={{backgroundColor: '#cc1818', color: 'white'}}
                  dropDownStyle={{backgroundColor: '#cc1818', color: 'white'}}
                  onChangeItem={item => setCategory(item.value)}
              />
            </View>
            <View style={{width: '40%'}}>
              <DropDownPicker
                items={[
                  {label: '1 KM', value: '1'},
                  {label: '2 KM', value: '2'},
                  {label: '3 KM', value: '3'},
                  {label: '4 KM', value: '4'},
                  {label: '5 KM', value: '5'},
                  {label: '6 KM', value: '6'},
                  {label: '7 KM', value: '7'},
                  {label: '8 KM', value: '8'},
                  {label: '9 KM', value: '9'},
                  {label: '10 KM', value: '10'},
                ]}
                defaultValue={l}
                // placeholder="Select Radius" fafafa
                labelStyle={{color: 'white', textAlign: "center"}}
                arrowColor='white'
                containerStyle={{height: 40}}
                style={{backgroundColor: '#cc1818', color: 'white'}}
                dropDownStyle={{backgroundColor: '#cc1818', color: 'white'}}
                onChangeItem={item => setL(item.value)}
              />
            </View> 
          </View>
          <ScrollView style={{width: '100%'}}>
          <View style={{alignItems: 'center'}}>
          {users ? 
          ( users.map((item, index) => {
              return (
                  (item.distance <= l) ? 
                  (
                    <View style={styles.usersInfo} key={index}>
                        <Avatar.Image
                          source={{uri: item.picture}}
                          size={60}
                          onPress={() => console.log('Pressed')}
                        />
                      <Text style={{fontSize: 21, fontWeight: '400', textAlign: "center", top: '22%', left: '40%', position: "absolute", color: 'white'}}>{item.name}</Text>
                      <Text style={{fontSize: 21, fontWeight: '400', textAlign: "center", top: '55%', left: '40%', position: "absolute", color: 'white'}}>{item.bloodGroup}</Text>
                      <Text style={{fontSize: 21, fontWeight: '400', textAlign: "center", top: '85%', left: '40%', position: "absolute", color: 'white'}}>{item.category}</Text>
                      <View style={{position: "absolute", marginLeft: '70%', marginTop: '25%'}}>
                        <CustomButton text='View' color="white" txtColor='black' borderColor='white' onPress={() =>  props.navigation.navigate('User Profile',{id : item.id})}/>
                      </View>
                    </View>
                  )
                  :
                  (
                    <Text style={{justifyContent: "center"}}></Text>
                  )   
              )
            })) : 
            (
            <Text style={{justifyContent: "center", fontSize: 20, marginTop: '70%'}}> Waiting.... </Text>
            )
          }
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
  usersInfo: {

    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#cc1818', 
    padding: 20, 
    width: 320, 
    height: 120,
    // borderRadius: 8, 
    // shadowColor: "#ebebeb",
      shadowOffset: {
        width: 0,
        height: 0
      },
    shadowOpacity: 20,
    shadowRadius: 8,
    elevation: 30,
    marginTop: '3%',
    borderRadius: 12, 
    shadowColor: "#f2f2f2",

  }
});


const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
  }
}

export default connect(mapStateToProps, null)(Notification)
