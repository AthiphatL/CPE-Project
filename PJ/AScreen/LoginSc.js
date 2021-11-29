import React, { useState, useEffect, createRef, Component  } from 'react';
import { View, StyleSheet, Text, Image , TextInput, Button, TouchableOpacity, Alert, PasswordInputText } from 'react-native';
import { FillButton } from './component/FillButton';
import { HeadFN } from './component/HeadFn';
import { Input } from './component/Input';


export default function LoginSc({ navigation }) {
    const [username, setusername] = React.useState('');
    const [password, setpassword] = React.useState('');


    const getlogin = async () => {

        if (username == '' & password == '') {
            return alert('Please write your username & password.')
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(
                {
                    "username": username,
                    "password": password,
                }
            )
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`http://203.154.82.235/users/login`, requestOptions)
            const result = await response.json();
            console.log(result)
            navigation.navigate("Main")
            alert('Login Succeed');
            // if (result.ret == 0) {
            //     console.log(result.msg);
            //     navigation.navigate("Main")
            // }
            // else {
            //     console.log('error')
            //     alert('Login Failed');
            // }

        }
    }

    return (<View style={styles.container}>
        <HeadFN style={styles.title}>Earth Worm</HeadFN>
        <View ><Image style={styles.photoin} source={require('./Photosc/phmain.png')} /></View>
        <Input
            style={styles.input}
            placeholder={'Username'}
            onChangeText={setusername}
            value={username}
        />
        <Input
            style={styles.input}
            placeholder={'Password'}
            onChangeText={setpassword}
            value={password}
            secureTextEntry />
        <FillButton
            title={'Login'}
            style={styles.loginButton}
            onPress={() => getlogin()} />
        <FillButton
            title={'Register'}
            onPress={() => {
                navigation.navigate("Regis2");
            }} />
    </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        alignItems: 'center',
        backgroundColor: '#FF9BC0'

    },
    input: {

        marginVertical: 8,
    },
    title: {
        marginBottom: 10,
    },
    loginButton: {
        marginVertical: 32,

    },
    photoin: {
        marginTop: 20,
        resizeMode: 'cover',
        marginLeft: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 130,
        width: 150,
    },
    photoin2: {
        marginTop: 20,
        resizeMode: 'stretch',
        marginLeft: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 130,
        width: 150,
    },

})

