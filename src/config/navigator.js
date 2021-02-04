import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'
import Main from '../screens/main'
import Home from '../screens/home'
import SignUp from '../screens/signUp'
import SignIn from '../screens/signIn'
import Chatroom from '../screens/chatroom'
import Donor from '../screens/donor'
import Profile from '../screens/profile'
import UsersProfile from '../screens/usersProfile'
import Chat from '../screens/chat'
import { connect } from 'react-redux'
import DrawerContent from './drawerContent'



const Stack = createStackNavigator()
const Drawerr = createDrawerNavigator();

function Navigator(){

  return (
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
              headerTitleAlign: 'center',
              ...TransitionPresets.FadeFromBottomAndroid,
              gestureEnabled: true,
              gestureDirection: 'horizontal'
              }}>
            <Stack.Screen 
            name="Main" 
            component={Main} 
            initialRouteName='Main'
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="Sign Up" 
            component={SignUp} 
            options={{headerShown: true, 
              headerStyle: {
              backgroundColor: '#d62727',
            },
            headerTintColor: '#fff',
            headerStatusBarHeight: 20,
            headerTitleStyle: {
              fontWeight: 'bold'
            },}}
            />
            <Stack.Screen 
            name="Sign In" 
            component={SignIn} 
            options={{headerShown: true, 
              headerStyle: {
              backgroundColor: '#d62727',
            },
            headerTintColor: '#fff',
            headerStatusBarHeight: 20,
            headerTitleStyle: {
              fontWeight: 'bold'
            },}}
            />
           <Stack.Screen 
            options={{headerShown: false}} 
            name="Home" 
            component={DrawerNavigator}
            />
            <Stack.Screen 
            name="User Profile" 
            component={UsersProfile} 
            options={{headerShown: true, 
              headerStyle: {
              backgroundColor: '#d62727',
            },
            headerTintColor: '#fff',
            headerStatusBarHeight: 20,
            headerTitleStyle: {
              fontWeight: 'bold'
            },}}
            />
            <Stack.Screen 
            options={{headerShown: true, headerStyle: {
              backgroundColor: '#d62727',
            }, headerTintColor: '#fff',
            headerStatusBarHeight: 20,
            headerTitleStyle: {
              fontWeight: 'bold'
            },}} 
            name="Chat" 
            component={Chat} 
            />
          </Stack.Navigator>
        </NavigationContainer>  
      );
  }



export function DrawerNavigator() {

  return (
    <Drawerr.Navigator drawerContent={(props) => <DrawerContent {...props}/>} initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#d62727',
        // width: '70%'
      }}>
        <Drawerr.Screen 
          name="Home" 
          component={Home}
          options={{ drawerLabel: 'Home' }}
       />
        <Drawerr.Screen 
          name="Chatroom" 
          component={Chatroom} 
          />
          <Drawerr.Screen 
          name="Donor" 
          component={Donor} 
          />
          <Drawerr.Screen 
          name="Profile" 
          component={Profile} 
          />
      </Drawerr.Navigator>
  )
}



const mapStateToProps = function(state) {
  return {
    fbUser: state.facebookUserReducer.user,
    goglUser: state.googleUserReducer.user
  }
}



export default connect(mapStateToProps, null)(Navigator)

