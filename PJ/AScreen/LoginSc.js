import React,{ useState, useEffect, createRef } from 'react';
import {View, StyleSheet, Text,Image} from 'react-native';
import { FillButton } from './component/FillButton';
import { HeadFN } from './component/HeadFn';
import { Input } from './component/Input';
import { Error } from './component/Error';

export default function LoginSc({navigation}){
    const {usEmails,setusEmails}= useState([]);
    const {usPasswords,setusPasswords}= useState([]);
    const [isLoading, setIsloading] = useState(false);
    
return( <View style={styles.container}>
        <HeadFN style={styles.title}>Earth Worm</HeadFN>
        <View ><Image style={styles.photoin} source={require('./Photosc/phmain.png')}/></View>
        <Error error={''} />
        <Input 
        style={styles.input} 
        placeholder={'Email'} 
        keyboardType={'email-address'} />
        <Input 
        style={styles.input} 
        placeholder={'Password'} 
        secureTextEntry />
        <FillButton 
        title={'Login'} 
        style={styles.loginButton} 
        onPress={() => {
            navigation.navigate("Main");
        }}/>
        <FillButton 
        title={'Register'} 
        onPress={() => {
        navigation.navigate("Regis2");
        }}/>
        </View>
        
);
}

const styles = StyleSheet.create({
container:{
    flex:1,
    padding:20,
    paddingTop:30,
    alignItems:'center',
    backgroundColor:'#FF9BC0'

},
input:{

    marginVertical:8,
},
title:{
    marginBottom:10,
},
loginButton:{
    marginVertical:32,
    
},
photoin:{
    marginTop:20,
    resizeMode: 'cover',
    marginLeft:25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:130,
    width:150,
},
photoin2:{
    marginTop:20,
    resizeMode: 'stretch',
    marginLeft:100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:130,
    width:150,
},

})

