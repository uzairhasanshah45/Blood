import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Navigator from "./src/config/navigator"
import { store, persistor } from './src/store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



export default function App() {

    return(
      <Provider store={store} >
        <PersistGate persistor={persistor}>
            <Navigator/>
        </PersistGate>
     </Provider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



/*pehly constructor phir render phir did mount*/
/*constructor or didmount ek baar chalta hai*/

/*shouldcomponent pehly chalta hai didupdate se pehly*/

/*didupdate props or state ke change pr chalta hai or ye initially n chalta*/

/*getderivestatefromprops -----> ye props ke change pr chalta hai syntax --->*/

/*static getDerivedStateFromProps(props){  --------> initially bhi chalta hai or jub koi props ya state update ho tu jub bhi chalta hai or ye kaam props kechange pr state ko update krna hai*/

    /*return{
      text: props.nm == ''
    }
  }*/
/*types of hooks lifecycle:  */


/*adb shell input keyevent 82 for viewing the menu bar in expo*/


/* three types of navigator

1- stacck
2- switch ----> isme 2 stacknavigator banty hn mtlb auth ka alag baki alag taky home se wapis back krky login pr na jae
3- drawer ---->isme overlay pr jo screens hti hain wo hai y*/

