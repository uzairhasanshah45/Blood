import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';


function googleCustomButton(props)
{
   const facebookContent = (

        <View style={[styles.goglButton, { backgroundColor: props.color}]}>
            <Text style={styles.goglText}>{props.text}</Text>
        </View>
    )

    return (
    
        <TouchableOpacity onPress={props.onPress}>{facebookContent}</TouchableOpacity>
        );
}


const styles = StyleSheet.create({
    goglButton:{
        padding: 9,
        width: 315,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#7D7A7A",
        shadowOpacity: 0.23,
        shadowRadius: 3.82,
        elevation: 2,
    },
    goglText:{
        color: '#7D7A7A',
        fontSize: 20,
        marginTop: 5
    }
})

export default googleCustomButton 