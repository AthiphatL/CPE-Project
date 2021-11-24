import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { HeadFN } from './component/HeadFn';
import { FillButton } from './component/FillButton';
import { Tab, TabView } from 'react-native-elements';
import Africanw from './Africanw';
import Tigerw from './Tigerw';
import Bluew from './Bluew';


export default () => {
    const [index, setIndex] = React.useState(0);

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="default"
            >
                <Tab.Item
                    title="African"
                    titleStyle={{ fontSize: 12 }}
                />
                <Tab.Item
                    title="Tiger"
                    titleStyle={{ fontSize: 12 }}
                />
                <Tab.Item
                    title="Blue"
                    titleStyle={{ fontSize: 12 }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%',backgroundColor:'#FBDDA0',  }}>
                    <Text h1>
                        <Africanw />
                    </Text>
                </TabView.Item>
                <TabView.Item style={{  width: '100%',height:'100%',backgroundColor:'#FBDDA0', }}>
                    <Text h1>
                        <Tigerw />
                    </Text>
                </TabView.Item>
                <TabView.Item style={{  width: '100%',height:'100%',backgroundColor:'#FBDDA0', }}>
                    <Text h1>
                    <Bluew />
                    </Text>
                </TabView.Item>
            </TabView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100,
        alignItems: 'center',
        backgroundColor: '#FBDDA0'

    },
    title: {
        marginBottom: 1,
    },
    title2: {
        marginBottom: 10,
    },
    textto: {
        marginLeft: 50,
    },
    photoin: {
        resizeMode: 'stretch',
        marginLeft: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 150,
        width: 150,
    },
})
