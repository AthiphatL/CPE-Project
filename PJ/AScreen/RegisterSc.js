import React,{ useState, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { FillButton } from './component/FillButton';
import { HeadFN } from './component/HeadFn';
import { Input } from './component/Input';
import { Error } from './component/Error';

export default function RegisterSc({navigation}){
    const {usEmails,setusEmails}= useState([]);
    const {usUsern,setusUsern}= useState([]);
    const {usPasswords,setusPasswords}= useState([]);
    const {usFname,setusFname}= useState([]);
    const {usSname,setusSname}= useState([]);
    const {usTel,setusTel}= useState([]);
    const [isLoading, setIsloading] = useState(false);

    

const sendRegister = () => {
        fetch('http://203.154.82.235/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usUsern, password: usPasswords, email: usEmails ,firstname: usFname,lastname: usSname,phone: usTel})
        })
            .then(resp => resp.json())
            .then(data => {
                data.navigation.navigate('Profiles')
            })
    }

return( <View style={styles.container}>
        <HeadFN style={styles.title}>Register</HeadFN>
        <Error error={''} />
        <Input 
        style={styles.input} 
        onChangeText={(valu) => setusUsern(valu)}
        placeholder={'Username'} />
        <Input 
        style={styles.input} 
        onChangeText={(valf) => setusFname(valf)}
        placeholder={'First name'} />
        <Input 
        style={styles.input} 
        onChangeText={(vals) => setusSname(vals)}
        placeholder={'Surname'} />
        <Input 
        style={styles.input} 
        placeholder={'Password'} 
        onChangeText={(valp) => setusPasswords(valp)}
        secureTextEntry />
        <Input 
        style={styles.input} 
        placeholder={'Email'} 
        onChangeText={(vale) => setusEmails(vale)}
        keyboardType={'email-address'} />
        <Input 
        style={styles.input} 
        placeholder={'Tel'} 
        onChangeText={(valt) => setusTel(valt)}
        />
        <FillButton 
        title={'Register'} 
        style={styles.loginButton} 
        onPress={() => {
            navigation.navigate("Login");
        }}/>
        <FillButton 
        title={'Register'} 
        style={styles.loginButton} 
        onPress={() => {
            sendRegister();
        }}/>
        </View>

);
}

const styles = StyleSheet.create({
container:{
    flex:1,
    padding:10,
    paddingTop:10,
    alignItems:'center',
    backgroundColor:'#FF9BC0'
},
input:{

    marginVertical:5,
},
title:{
    marginBottom:15,
},
loginButton:{
    marginVertical:32,
}

})

