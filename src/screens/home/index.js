import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux'
import * as Location from 'expo-location';
import homeLogo from '../../../assets/home1.png'
import location from '../../../assets/loc1.png'



function Home(props) {

  const [locationn, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocationPermission()
  }, [])

  const getLocationPermission =  async() =>{

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    
    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    let geocode = await Location.reverseGeocodeAsync(location.coords);
    setLocation(geocode);
  
  }

  let text;
  if (errorMsg) {
    text = errorMsg;
  } else if (locationn) {
    text = (locationn);
  }
    return(
      <View style={styles.container}>
      <Text style={styles.headr1}>Blood</Text>
      <View style={styles.firstPara}>
          <Text style={styles.para1}>Hello, {props.fbUser.name}</Text>
          <Text style={styles.para1}>Looking for your love once?</Text>
      </View>
      <Image source={homeLogo} style={styles.homePic}/>
      <View style={styles.main}>
          <View style={styles.secondPara}>
              <Text style={styles.para2}>Current Location</Text>
          </View>
          <Image source={location} style={styles.locPic}/>
          <View style={styles.thirdPara}>
          <Text style={{fontSize: 20, color: 'yellow', marginLeft: '2%', marginTop: 10, fontWeight: '500' }}>{ text ? (text[0].name + ' ' + text[0].city + ' ' + text[0].country ) : 'waiting..' }</Text>
          </View>
      </View>
    </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: null,
    height: null,
  },
  homePic:{
    width: 200,
    height: 200,
    marginTop: 40
  },
  headr1:{
    color:'#d91523',
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 37,
  },
  headr2:{
    color: '#cd0000'
  },
  main:{
    // color: '#1a54d9'
    borderWidth: 1,
    // borderColor: '#f8f8f8',
    borderColor: '#d91523',
    // backgroundColor: '#fcfcfc', 
    backgroundColor: '#d91523',
    width: 300,
    height: 125,
    paddingTop: 25,
    borderRadius: 8, 
    shadowColor: "#ebebeb",
    // shadowColor: "#f2f2f2",
      shadowOffset: {
        width: 0,
        height: 0
      },
    shadowOpacity: 20,
    shadowRadius: 8,
    elevation: 30,
  },
  firstPara:{
    marginTop: 30,
    marginLeft: -120,
  },
  para1:{
    color: '#565353',
    fontSize: 15
  },
  secondPara:{
    marginTop: 10,
    marginLeft: 50
  },
  para2:{
    // color: '#565353',
    color: 'white',
    fontSize: 17
  },
  locPic:{
    marginLeft: 18,
    marginTop: 40,
    position: "absolute",
    width: 15,
    height: 20
  },
  thirdPara:{
      marginLeft: 55,
      marginTop: 5
  },
});



const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
  }
}


export default connect(mapStateToProps, null)(Home)


