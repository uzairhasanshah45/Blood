import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, ScrollView } from 'react-native';
import CustomButtonForApp from '../../components/customButton'
import { SignUpUser, firebase } from '../../config/firebase'
import { connect } from 'react-redux'


class SignUp extends React.Component  {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      password: "",
      pNo: ""};

  }

  onSignUp()
  {
    this.props.onFbLogin({
      docId: doc.id,
      userId : data.id,
      name : data.name
    })
    props.navigation.navigate("Home")
  }

   async signUp()
    {
      try
      { 
        if(this.state.fName != '' && this.state.lName != '' && this.state.email != '' && this.state.password != '')
        {
          const response = await SignUpUser(this.state.email, this.state.password)
          firebase.firestore().collection('User').add({
            name: this.state.fName + ' ' + this.state.lName,
            email: this.state.email,
            id: response.user.uid,
            phoneNumber: this.state.pNo,
            bloodGroup: 'Blood Group',
            health: 'Health',
            category: 'Category',
            picture: "",
            lat: '',
            long: '',
            place: '',
            DOB : ''
          }).then(doc => {
            this.props.onFbLogin({
              docId: doc.id,
              userId : response.user.uid,
              name : this.state.fName
            })
            this.props.navigation.navigate("Home")
          })
          
          // Alert.alert(
          //   "Sign Up",
          //   "SignUp Successfully!",
          //   [
          //     {
          //       text: "Cancel",
          //       onPress: () => console.log("Cancel Pressed"),
          //       style: "cancel"
          //     },
          //     { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
          //   ],
          //   { cancelable: false }
          // );
        }
        else{
          Alert.alert(
            "Error",'Invalid fields',
            [{  text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      }
        catch(e)
        {
          Alert.alert(
            "Error",`${e.message}`,
            [{  text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
    
  }
 
  
  render()
  {
    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.signUpFoam}>
              <View style={styles.signUpAllFields}>
                <Text style={styles.signUpInputLabels}>First name</Text>
                <TextInput placeholder = "first name" onChange={(e)=> this.setState({fName: e.nativeEvent.text})} style={styles.signUpInputs} onSubmitEditing={() => { this.firstTextInput.focus(); }} blurOnSubmit={false}/>
              </View>
              <View style={styles.line1}></View>
              <View style={styles.signUpAllFields}>
                <Text style={styles.signUpInputLabels}>Last name</Text>
                <TextInput placeholder = "last name" onChange={(e)=> this.setState({lName: e.nativeEvent.text})} style={styles.signUpInputs} ref={(input) => { this.firstTextInput = input; }} onSubmitEditing={() => { this.secondTextInput.focus() }} blurOnSubmit={false}/>
              </View>
              <View style={styles.signUpAllFields}>
                <Text style={styles.signUpInputLabels}>Mail</Text>
                <TextInput placeholder = "email address" onChange={(e)=> this.setState({email: e.nativeEvent.text})} style={styles.signUpInputs} ref={(input) => { this.secondTextInput = input; }} onSubmitEditing={() => { this.thirdTextInput.focus() }} blurOnSubmit={false}/>
              </View>
              <View style={styles.signUpAllFields}>
                <Text style={styles.signUpInputLabels}>Password</Text>
                <TextInput placeholder = "password" onChange={(e)=> this.setState({password: e.nativeEvent.text})} style={styles.signUpInputs} ref={(input) => { this.thirdTextInput = input; }} onSubmitEditing={() => { this.fourthTextInput.focus() }} blurOnSubmit={false}/>
              </View>
              <View style={styles.signUpAllFields}>
                <Text style={styles.signUpInputLabels}>phone number</Text>
                <TextInput type='date' placeholder = "not mandatory" keyboardType={'numeric'} onChange={(e) => this.setState({pNo: e.nativeEvent.text})} style={styles.signUpInputs} ref={(input) => { this.fourthTextInput = input; }} />
              </View>
              <View style={{alignItems: 'center', marginLeft: -35, marginTop: 35}}>
                <CustomButtonForApp text='SIGN UP' color="#d91523" width= 'large' onPress={this.signUp} />
              </View>
              <View style={styles.line2}></View>
            </View>
          </ScrollView>
        </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: null,
    height: null,
  },
  signUpFoam:{
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#F8F8F8',
    width: 300,
    height: 530,
    paddingTop: 40,
    paddingLeft: 40,
    shadowColor: "#dedede",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 20,
    shadowRadius: 8,
    elevation: 9,
    borderRadius: 8,
    marginTop: '12%'
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
    borderRadius: 4, 
    backgroundColor: '#FCFCFC',
    textAlign: "center",
    color: 'grey'
  },
  line1:{
    borderWidth: 1,
    borderColor: '#6F1FF9',
    width: 4,
    height: 39,
    borderRadius: 4,
    backgroundColor: '#6F1FF9',
    marginLeft: -2,
    marginTop: 50, 
    position: 'absolute'
  },
  line2:{
    borderWidth: 1, 
    borderColor: '#FFD03D', 
    width: 4, 
    height: 39, 
    borderRadius: 4, 
    backgroundColor: '#FFD03D', 
    marginLeft: -2, 
    marginTop: 360, 
    position: 'absolute'
  }
 
});


const mapDispatchToProps = (dispatch) =>{   
  return{
      onFbLogin : (user) => dispatch(setFbUser(user)),
    }
}


export default connect(null, mapDispatchToProps)(SignUp)

