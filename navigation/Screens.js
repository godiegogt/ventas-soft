import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SellerScreen from '../screens/SellerScreen';
import CheckinScreen from '../screens/CheckinScreen';
import LoginScreen from '../screens/LoginScreen';
import SelllsScreen from '../screens/SellsScreen';
import SellsScreen from '../screens/SellsScreen';


import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8
};



function SellStack(props) {
    return (
      <Stack.Navigator mode="card">
        <Stack.Screen 
          name="Seller"
          component={SellerScreen}
        />
        <Stack.Screen 
          name="Checkin"
          component={CheckinScreen}
          /*options={{
            header: ({ navigation, scene }) => (
              <Header back white transparent title="" navigation={navigation} scene={scene} />
            ),
            headerTransparent: true
          }}*/
        />
      </Stack.Navigator>
    );
  }

function LoginStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
        </Stack.Navigator>
    );
}

function SellsStack(props) {
  return (
      <Stack.Navigator mode="card" headerMode="screen">
          <Stack.Screen
              name="Sells"
              component={SellsScreen}
          />
      </Stack.Navigator>
  );
}

  export default function AppStack(props) {
    return (
      <Drawer.Navigator
        style={{ flex: 1 }}
        
        
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8
        }}
        drawerContentOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: materialTheme.colors.primary,
          inactiveBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.74,
            paddingHorizontal: 12,
            // paddingVertical: 4,
            justifyContent: "center",
            alignContent: "center",
            // alignItems: 'center',
            overflow: "hidden"
          },
          labelStyle: {
            fontSize: 18,
            fontWeight: "normal"
          }
        }}
        initialRouteName="Sell"
        
      >
        <Drawer.Screen
          name="Sell"
          component={SellStack}
        />
        <Drawer.Screen
          name="Sells"
          component={SellsStack}
        />
      </Drawer.Navigator>
    );
  }



