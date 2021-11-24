import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { HeadFN } from './component/HeadFn';
import MQTT from 'sp-react-native-mqtt';

const App = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container2}>
            <Text>{isEnabled ? 'WaterPump On' : 'WaterPump Off'}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}

            />
        </View>
    );
}
export default function StatusSc({ navigation }) {
    const [isLoading, setIsloading] = useState(true);
    const [currentDate, setCurrentDate] = useState([0]);
    const [listDateTime, setListDateTime] = useState([0]);
    const [datamqtt, setData] = useState([0]);
    const [datamqttH, setDataH] = useState([0]);
    const [dataWeight,setWeight] = useState([0]);
    // const [controlDevice, setControlDevice] = useState(' ');

    useEffect(() => {
        PubSubMQTT('data', 'on');
        setInterval(() => {
            currentTime();
        }, 1000);
    }, []);

    const currentTime = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var _date =
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
        setCurrentDate(_date);
        return _date;
    };

    const insertDataToList = (msg, date) => {
        console.log('date: ' + date);

        setData(datamqtt => [...datamqtt, msg]);
        setListDateTime(listDateTime => [...listDateTime, date]);

        setIsloading(false);
    };
    const insertDataToListHM = (msg, date) => {
        console.log('date: ' + date);

        setDataH(datamqttH => [...datamqttH, msg]);
        setListDateTime(listDateTime => [...listDateTime, date]);

        setIsloading(false);
    };
    const insertDataToListW = (msg, date) => {
        console.log('date: ' + date);

        setWeight(dataWeight => [...dataWeight, msg]);
        setListDateTime(listDateTime => [...listDateTime, date]);

        setIsloading(false);
    };

    const PubSubMQTT = (device, status) => {
        /* create mqtt client */
        MQTT.createClient({
            uri: 'mqtt://203.154.82.235:1883',
            clientId: 'your_client_id',
        })
            .then(function (client) {
                client.on('closed', function () {
                    console.log('mqtt.event.closed');
                });

                client.on('error', function (msg) {
                    console.log('mqtt.event.error', msg);
                });

                client.on('message', function (msg) {
                    console.log('mqtt.event.message', msg);
                    if (msg.topic == 'EW/Temp') {
                        setIsloading(true);
                        insertDataToList(msg.data, currentTime());
                    } else if (msg.topic == 'EW/Humid') {
                        setIsloading(true);
                        insertDataToListHM(msg.data, currentTime());
                    }else if (msg.topic == 'EW/Weight') {
                        setIsloading(true);
                        insertDataToListW(msg.data, currentTime());
                    }
                });

                client.on('connect', function () {
                    console.log('connected');
                    client.subscribe('EW/Temp', 0);
                    client.subscribe('EW/Humid', 0);
                    client.subscribe('EW/Weight', 0);
                    // client.publish('/data', 'test', 0, false);
                    client.subscribe('/device', 0);
                    // client.publish('/device', `${device} ${status}`, 0, false);
                });

                client.connect();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const data = {
        labels: listDateTime.slice(-10),
        datasets: [{
            data:datamqtt.slice(-10)
        }],
    }
    const dataH = {
        labels: listDateTime.slice(-10),
        datasets: [{
            data:datamqttH.slice(-10)
        }],
        color: (opacity = 1) => `rgba(0,1,102, ${opacity})`,
    }

        return (
            <View style={styles.container}>
                {/* <HeadFN style={styles.title}>Status</HeadFN> */}
                <Text style={{ fontSize: 26 }}>Time:{currentDate}</Text>
                <HeadFN style={styles.title}>Temperature</HeadFN>
                <Text style={{ fontSize: 26 }}>{datamqtt.slice(-1)} </Text>
                <HeadFN style={styles.title}>Humidity</HeadFN>
                <Text style={{ fontSize: 26 }}> {datamqttH.slice(-1)} % </Text>
                {/* <HeadFN style={styles.title}>Weight</HeadFN>
                <Text style={{ fontSize: 26 }}>  {dataWeight.slice(-1)} k.</Text> */}
                <View style={styles.container}>
                {/* <HeadFN style={styles.title}>ControlWaterPump</HeadFN>
                    <App /> */}
                </View>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            paddingTop: 10,
            alignItems: 'center',
            backgroundColor: '#FBDDA0'

        },
        title: {
            marginBottom: 1,
            padding: 20,
            paddingTop: 30,
        },
        container2: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }
    })
