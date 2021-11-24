import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native'
import { HeadFN } from './component/HeadFn';
import { Tab, TabView ,Input} from 'react-native-elements';
import MQTT from 'sp-react-native-mqtt';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FillButton } from './component/FillButton';
// import { Input } from 'react-native-elements/dist/input/Input';

export default function DashBoardSc({ navigation }) {
    const [isLoading, setIsloading] = useState(true);
    const [currentDate, setCurrentDate] = useState([0]);
    const [listDateTime, setListDateTime] = useState([0]);
    const [datamqtt, setData] = useState([0]);
    const [datamqttH, setDataH] = useState([0]);
    const [dataWeight,setWeight] = useState([0]);
    const [dataPreWeight,setPreWeight] = useState([0]);
    // const [controlDevice, setControlDevice] = useState(' ');

    // useEffect(() => {
    //     PubSubMQTT({dataWeight});
    //     setInterval(() => {
    //         currentTime();
    //     }, 1000);
    // }, []);

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

    const PubSubMQTT = ( status) => {
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
                    // client.publish('/data', 'test', 0, false);
                    client.subscribe('EW/Weight', 0);
                    client.publish('EW/Weight', ` ${status}`, 0, false);
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
            data: datamqtt.slice(-10)
        }],
    }
    const dataH = {
        labels: listDateTime.slice(-10),
        datasets: [{
            data: datamqttH.slice(-10)
        }],
        color: (opacity = 1) => `rgba(0,1,102, ${opacity})`,
    }
    const dataWee = {
        labels:  ['1','2','3','4','5'],
        datasets: [{
            data:[50,75,90,110,150]
        }],
        
    }

    return (
        <View style={styles.container}>
            {/* <HeadFN style={styles.title}> Temp & Humi ทุกๆ3ชม.</HeadFN>
            <LineChart
                data={{
                    labels: ['00.00น.', '03.00น.', '06.00น.', '09.00น.', '12.00น.', '15.00น.', '18.00น.', '21.00น.'],
                    datasets: [{
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                    },
                    {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ],
                        color: (opacity = 1) => `rgba(0,1,102, ${opacity})`,
                    }],
                    legend: ['Temp', 'Humid'],
                }}
                width={Dimensions.get("window").width-10} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#81007F",
                    backgroundGradientFrom: "#E4A0F7",
                    backgroundGradientTo: "#AF69EE",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            /> */}
            {/* <HeadFN style={styles.title}> Weight </HeadFN> */}
            <Input
            placeholder=' INPUT Weight'
            onChangeText={(val) => setPreWeight(val)}
        />
            <FillButton title={'set weight'} onPress={() => setWeight(dataPreWeight)} />
            <FillButton title={'Insert weight'} onPress={() => PubSubMQTT(dataWeight)} />
            <BarChart
                data= {dataWee}
                width={Dimensions.get("window").width - 10} // from react-native
                height={180}
                yAxisLabel=""
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#81007F",
                    backgroundGradientFrom: "#E4A0F7",
                    backgroundGradientTo: "#AF69EE",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <HeadFN style={styles.title}> Weight = {dataWeight.slice(-1)} </HeadFN>
            <HeadFN style={styles.title}> Time   ={listDateTime.slice(-1)} </HeadFN>
            {/* <FillButton title={'Temp&Humidity'} onPress={() => {navigation.navigate("DashBoard2");}}/> */}
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
        fontSize: 24,
        marginBottom: 1,
    },
})
