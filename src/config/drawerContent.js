import React, { useState, useEffect } from 'react'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {
    Title,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Colors,
    IconButton,
    Avatar,
    useTheme
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { StyleSheet, View, Alert } from 'react-native';
import { setCkUser } from '../store/actions/checkUserAction'
import { CommonActions } from '@react-navigation/native';
import { firebase } from './firebase'
import userLogo from '../../assets/user2.png'

function DrawerContent(props) {

    // const paperTheme = useTheme();

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [picture, setPicture] = useState('')

    useEffect(() => {
        userData()
      },[])

    const userData = () =>{

        firebase.firestore().collection('User').doc(props.fbUser.docId).get().then(function(doc){
            const data = doc.data()
            setName(data.name)
            setCategory(data.category)
            setPicture(data.picture)
        })
    }

    const logout = () => {

        Alert.alert(
            "Logout",
            "Confirm logout?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => { props.navigation.dispatch(CommonActions.navigate({name: 'Main'})), props.onFbLogin({logout: true})} }
            ],
            { cancelable: false }
          );
    }
    return (
        <DrawerContentScrollView {...props}>
            <View
                style={
                    styles.drawerContent
                }
            >
                <View style={styles.userInfoSection}>
                    <View style={{alignItems: "center", marginLeft: '-35%'}}>
                    <View style={{ display: 'flex', }}>
                        <Avatar.Image
                            source={picture ? {uri : picture} : userLogo}
                            size={100}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            icon="camera"
                            color={Colors.grey100}
                            size={15}
                            onPress={() => props.navigation.navigate('Profile')}
                            style={{ position: "relative", marginLeft: '28%', marginTop: '-12%', backgroundColor: 'grey', opacity: 0.6, outline: 'none' }}
                        />
                    </View>
                    <Title style={styles.title}>{name}</Title>
                    <Title style={{ color: 'white', fontSize: 15, marginTop: '-3%', }}>{category}</Title>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color='white'
                                size={size}
                            />
                        )}
                        label="Home"
                        labelStyle={{ color: 'white' }}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="chat"
                                color='white'
                                size={size}
                            />
                        )}
                        label="Chatroom"
                        labelStyle={{ color: 'white' }}
                        onPress={() => props.navigation.navigate('Chatroom')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="tune"
                                color='white'
                                size={size} />
                        )}
                        label="Donor"
                        labelStyle={{ color: 'white' }}
                        onPress={() => props.navigation.navigate('Donor')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="logout"
                                color='white'
                                size={size} />
                        )}
                        label="Logout"
                        labelStyle={{ color: 'white' }}
                        onPress={() => logout()}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences" style={{ color: 'white' }}>
                    <TouchableRipple onPress={props.toggleTheme}>
                        <View style={styles.preference}>
                            <Text style={{ color: 'white' }}>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.preference}>
                            <Text style={{ color: 'white' }}>RTL</Text>
                            <View pointerEvents="none">
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>

    );
}




const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 70,
        marginTop: 20,
    },
    drawerSection: {
        marginTop: 15,
    },
    title: {
        marginTop: '3%',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

const mapStateToProps = function (state) {
    return {
        fbUser: state.facebookUserReducer.user,
    }
}

const mapDispatchToProps = (dispatch) =>{   
    return{
        onFbLogin : (user) => dispatch(setFbUser(user)),
        onLogout : (user) => dispatch(setCkUser(user))
      }
  }



export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)