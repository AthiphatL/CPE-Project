import React from 'react'
import { Button, StyleSheet, Text, View,Image } from 'react-native'
import { HeadFN } from './component/HeadFn';
import { FillButton } from './component/FillButton';

export default function MainSc({navigation}) {
    return (
        <View style={styles.container}>
            <HeadFN style={styles.title2}>Main</HeadFN>
            <View style={styles.title}>
            <FillButton title={'Profiles'} onPress={() => {navigation.navigate("Profiles");}}/>
            <FillButton title={'Status'} onPress={() => {navigation.navigate("Status");}}/>
            </View>

            <View style={styles.title}>
            <FillButton title={'Type'} onPress={() => {navigation.navigate("Type");}}/>
            <FillButton title={'DashBoard'} onPress={() => {navigation.navigate("DashBoard");}}/>
            </View>
            <View>
                <Image style={styles.photoin} source={require('./Photosc/main.png')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        paddingTop:30,
        alignItems:'center',
        backgroundColor:'#FBDDA0'
    
    },
    title:{
        marginBottom:1,
        paddingTop:50,
        padding:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title2:{
        marginBottom:10,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },  
    photoin:{
        marginTop:50,
        height:200,
        width:200,
    },
})
