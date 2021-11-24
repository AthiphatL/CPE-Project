import React from 'react';
import LoginSc from './AScreen/LoginSc';
import RegisterSc from './AScreen/RegisterSc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StatusSc from './AScreen/StatusSc';
import ProfilesSc from './AScreen/ProfilesSc';
import DashBoardSc2 from './AScreen/DashBoardSc2';
import DashBoardSc from './AScreen/DashBoardSc';
import TypeSc from './AScreen/TypeSc';
import MainSc from './AScreen/MainSc';
import Africanw from './AScreen/Africanw';
import Tigerw from './AScreen/Tigerw';
import Bluew from './AScreen/Bluew';
import historysc from './AScreen/historysc';
import Regis2 from './AScreen/Regis2';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Status2" activeColor="#e91e63" component={StatusSc} options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}/>
//       <Tab.Screen name="Control2" component={ControlSc} />
//       <Tab.Screen name="DashBoard2" component={DashBoardSc} />
//       <Tab.Screen name="Type2" component={TypeSc} />
//       <Tab.Screen name="Profiles2" component={ProfilesSc} />
//     </Tab.Navigator>
//   );
// }
function EW() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#FF9BC0", }, headerTitleAlign:'center',
      headerBackTitleVisible:true,}}>
      <Stack.Screen name="Login" component={LoginSc} options={{ title: "LOGIN",headerShown: false,  }} />
      <Stack.Screen name="Register" component={RegisterSc} options={{ title: "REGISTER",headerShown: false,  }} />
      <Stack.Screen name="Main" component={MainSc} options={{ title: "Main", headerShown: false,}} />
      <Stack.Screen name="Status" component={StatusSc} options={{ title: "Status", }} />
      <Stack.Screen name="DashBoard2" component={DashBoardSc2} options={{ title: "Temperature&Humidity",  }} />
      <Stack.Screen name="DashBoard" component={DashBoardSc} options={{ title: "Weight",  }} />
      <Stack.Screen name="Type" component={TypeSc} options={{ title: "Type",  }} />
      <Stack.Screen name="Profiles" component={ProfilesSc} options={{ title: "Profiles",  }} />
      <Stack.Screen name="Africanw" component={Africanw} options={{ title: "African",  }} />
      <Stack.Screen name="Tigerw" component={Tigerw} options={{ title: "Tiger",  }} />
      <Stack.Screen name="Bluew" component={Bluew} options={{ title: "Blue",  }} />
      <Stack.Screen name="history" component={historysc} options={{ title: "history",  }} />
      <Stack.Screen name="Regis2" component={Regis2} options={{ title: "TestRegis", headerShown: false, }} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default EW





