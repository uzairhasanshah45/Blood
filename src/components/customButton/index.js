import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';


function customButtonForApp(props)
{
   const facebookContent = (

        <View style={[styles.fbButton, { backgroundColor: props.color, width: props.width == 'large' ? 270 : 90, height: props.height == 'large' ? 45 : 30, borderColor: props.borderColor == 'white' ? 'white' : '#7bd126' }]}>
            <Text style={[styles.fbText, {marginTop: props.top == 'up'? 5 : 0, color: props.txtColor == 'black'? 'black' : 'white'}]}>{props.text}</Text>
        </View>
    )

    return (
    
        <TouchableOpacity onPress={props.onPress}>{facebookContent}</TouchableOpacity>
        );
}


const styles = StyleSheet.create({
    fbButton:{
        padding: 6,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 0.5,
        // borderColor: "#5768FF",
        // shadowColor: "#e0e0e0",
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        elevation: 2,
    },
    fbText:{
        color: 'white',
        fontSize: 18,
    }
})

export default customButtonForApp 