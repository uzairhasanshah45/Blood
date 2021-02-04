import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';



function facebookCustomButton(props)
{
   const facebookContent = (

        <View style={[styles.fbButton, { backgroundColor: props.color}]}>
            <Text style={styles.fbText}>{props.text}</Text>
        </View>
    )

    return (
    
        <TouchableOpacity onPress={props.onPress}>{facebookContent}</TouchableOpacity>
        );
}


const styles = StyleSheet.create({
    fbButton:{
        padding: 9,
        width: 315,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#5768FF",
        shadowOpacity: 0.23,
        shadowRadius: 3.82,
        elevation: 2,
    },
    fbText:{
        color: 'white',
        fontSize: 20,
        marginTop: 5
    }
})

export default facebookCustomButton 