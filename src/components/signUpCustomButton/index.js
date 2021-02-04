import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function SignUpCustomButton(props){

    const content = (

        <View style={[styles.button, { backgroundColor: props.color}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )

    return( 
        <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
        );
}


const styles = StyleSheet.create({

    button:{
        padding: 9,
        width: 150,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#7D7A7A",
        shadowOpacity: 0.23,
        shadowRadius: 3.82,
        elevation: 1,
    },
    text:{
        color: '#7D7A7A',
        fontSize: 20,
        marginTop: 5
    }
})

export default SignUpCustomButton 