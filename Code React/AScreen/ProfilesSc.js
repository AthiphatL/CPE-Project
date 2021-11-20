import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { HeadFN } from './component/HeadFn';
import { FillButton } from './component/FillButton';

export default function  ProfilesSc({navigation}) {
    return (
        <View style={styles.container}>
            {/* <HeadFN style={styles.title}> Profiles</HeadFN> */}
            <View style={{justifyContent:'center',flexDirection:'row',marginTop:10,}}><Image style={styles.photoin} source={require('./Photosc/mo.jpg')}/></View>
            <View style={styles.title3}></View>
            <HeadFN style={styles.title2}>Name:น้ำฝน อรุณเบิกฟ้า</HeadFN>
            <View style={styles.title3}></View>
            <HeadFN style={styles.title2}>UserID:Numfon007</HeadFN>
            <View style={styles.title3}></View>
            <HeadFN style={styles.title2}>Phone:0658821007</HeadFN>
            <View style={styles.title3}></View>
            <HeadFN style={styles.title2}>Email:Numfon@gmail.com</HeadFN>
            <View style={styles.title3}></View>
            <View style={styles.title}>
            <FillButton title={'Log out'} onPress={() => {navigation.navigate("Login");}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        paddingTop:10,
        backgroundColor:'#FBDDA0'
    
    },
    title:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
        marginBottom:10,
    },
    photoin:{
        resizeMode: 'stretch',
        marginTop:5,
        marginLeft:10,
        flexDirection:'column',
        justifyContent:'center',
        height:170,
        width:150,
        borderRadius:10,
    },
    title2:{
        fontSize:18,
        marginLeft:10,
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    title3: {
        marginBottom: 1,
        padding: 10,
        paddingTop: 15,
    },
})

