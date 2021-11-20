import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { FillButton } from './component/FillButton';
import { HeadFN } from './component/HeadFn';
import { Input } from './component/Input';
import { Error } from './component/Error';

export default function RegisterSc({navigation}){
return( <View style={styles.container}>
        <HeadFN style={styles.title}>Register</HeadFN>
        <Error error={''} />
        <Input 
        style={styles.input} 
        placeholder={'Username'} />
        <Input 
        style={styles.input} 
        placeholder={'First name'} />
        <Input 
        style={styles.input} 
        placeholder={'Surname'} />
        <Input 
        style={styles.input} 
        placeholder={'Password'} 
        secureTextEntry />
        <Input 
        style={styles.input} 
        placeholder={'Email'} 
        keyboardType={'email-address'} />
        <FillButton 
        title={'Register'} 
        style={styles.loginButton} 
        onPress={() => {
            navigation.navigate("Login");
        }}/>
        </View>

);
}

const styles = StyleSheet.create({
container:{
    flex:1,
    padding:20,
    paddingTop:40,
    alignItems:'center',
    backgroundColor:'#FF9BC0'
},
input:{

    marginVertical:8,
},
title:{
    marginBottom:15,
},
loginButton:{
    marginVertical:32,
}

})

