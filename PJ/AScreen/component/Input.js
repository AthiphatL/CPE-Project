import React from 'react';
import {View, StyleSheet, Text,TextInput} from 'react-native';

export function Input({style, ...props}){
return <TextInput {...props} style={[style,styles.input]} />
}

const styles = StyleSheet.create({
input:{
    backgroundColor: '#FAFAFA',
    width:'100%',
    padding:20,
    borderRadius: 8,
}
})