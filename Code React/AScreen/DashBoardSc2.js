import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { HeadFN } from './component/HeadFn';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

    export default function  ControlSc({navigation}) {
        return (
            <View style={styles.container}>
                {/* <HeadFN style={styles.title}> Control</HeadFN> */}
                <HeadFN style={styles.title}> Temperature</HeadFN>
            <LineChart
                data={{
                    labels: ['00.00น.', '03.00น.', '06.00น.', '09.00น.', '12.00น.', '15.00น.', '18.00น.', '21.00น.'],
                    datasets: [{
                        data: [
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50,
                            Math.random() * 50
                        ]
                    }],
                }}
                width={Dimensions.get("window").width-10} // from react-native
                height={180}
                yAxisLabel="$"
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
            <HeadFN style={styles.title}>  Humidity</HeadFN>
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
                        ],
                        color: (opacity = 1) => `rgba(0,1,102, ${opacity})`
                    }],
                }}
                width={Dimensions.get("window").width-10} // from react-native
                height={180}
                yAxisLabel="$"
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
            </View>
        )
    }
    
    const styles = StyleSheet.create({
        container:{
            flex:1,
            padding:10,
            paddingTop:10,
            alignItems:'center',
            backgroundColor:'#FBDDA0'
        
        },
        title:{
            marginBottom:10,
        },
    })
    