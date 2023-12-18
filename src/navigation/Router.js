import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Kategori,
  Favorit,
  Profile,
  KontenDetail,
  SplashScreen,
  AddBlogForm,
  EditBlogForm,
  Register,
  Login,
} from '../screens';
import {Home2, Category2, Star1, User} from 'iconsax-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'rgb(148, 108, 82)',
        tabBarInactiveTintColor: 'rgb(148, 108, 82)',
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: 'Poppins-Medium',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Home2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Kategori"
        component={Kategori}
        options={{
          tabBarLabel: 'Kategori',
          tabBarIcon: ({focused, color}) => (
            <Category2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorit"
        component={Favorit}
        options={{
          tabBarLabel: 'Favorit',
          tabBarIcon: ({focused, color}) => (
            <Star1
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <User
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="KontenDetail"
        component={KontenDetail}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddBlog"
        component={AddBlogForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditBlog"
        component={EditBlogForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};
export default Router;
