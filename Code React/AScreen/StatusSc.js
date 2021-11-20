import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { HeadFN } from './component/HeadFn';

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
    return (
        <View style={styles.container}>
            {/* <HeadFN style={styles.title}>Status</HeadFN> */}
            <HeadFN style={styles.title}>Temperature</HeadFN>
            <Text style={{fontSize:26}}>  30 องศา</Text>
            <HeadFN style={styles.title}>Humidity</HeadFN>
            <Text style={{fontSize:26}}>  53 % </Text>
            <View style={styles.container}>
            <HeadFN style={styles.title}>ControlWaterPump</HeadFN>
            <App />
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
