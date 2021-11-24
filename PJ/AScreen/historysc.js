import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { HeadFN } from './component/HeadFn';
import { FillButton } from './component/FillButton';
import { ListItem } from 'react-native-elements';

export default function historysc({ navigation }) {
    const [isLoading, setIsloading] = useState(true);
    // const [Tmp, setTmp] = useState([0]);
    // const [HMi, setHMi] = useState([0]);
    // const [IDs, setIDs] = useState([0]);
    // const [times, settimes] = useState([0]);
    const [data, setData] = useState([]);


    // const gethistory = () => {
    //     return fetch('http://203.154.82.235/history')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             return json.history;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    const gethistory = async () => {
        try {
            const response = await fetch('http://203.154.82.235/history');
            const json = await response.json();
            setData(json)
            // setTmp(json.temp);
            // setHMi(json.humi);
            // setIDs(json.id);
            // settimes(json.time);
        } catch (error) {
            console.error(error);
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        gethistory();
    }, []);
    return (
        <View style={styles.container}>
        {!isLoading && (
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Text style={{fontSize:24 }} numberOfLines={5}>
                    ID:{item.id} Temp:  {item.temp} ,
                    Humid:  {item.humi},
                    Time:{item.time}
                    </Text>
                    
                )}
            />
        )}
    </View>
    );
    // <View style={styles.container}>
    //     {!isLoading && (
    //         <Text>{IDs}:Humid={HMi} / Temp = {Tmp} / Time = {times}</Text>
    //     )}
    // </View>
    // )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        alignItems: 'center',
        backgroundColor: '#FBDDA0'

    },
    title: {
        marginBottom: 1,
        paddingTop: 50,
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title2: {
        marginBottom: 10,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    photoin: {
        marginTop: 20,
        height: 150,
        width: 200,
    },
})
