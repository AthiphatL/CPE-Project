import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Touchable} from 'react-native';

export function FillButton({title, style, onPress}){
    return(
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FAFAFA',
        width:'60%',
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        borderRadius:100,

    },
    text:{
        color:'black',
        fontWeight:'500',
        fontSize:16,
    }
})