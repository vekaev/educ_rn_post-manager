import React, { useState } from 'react';

import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { MainScreen } from './src/screens/Main';
import { PostScreen } from './src/screens/Post';
import { AboutScreen } from './src/screens/About';
import { BookedScreen } from './src/screens/Booked';
import { CreateScreen } from './src/screens/Create';

import { THEME } from './src/theme';
import { Platform } from 'react-native';
import { AppHeaderIcon } from './src/components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const PostScreenStack = createStackNavigator();
const BookedScreenStack = createStackNavigator();
const CreateScreenStack = createStackNavigator();
const AboutScreenStack = createStackNavigator();
const BottomBtnTabStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if(!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap} 
        onFinish={() => setIsReady(true)} 
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <NavigationContainer>
      <AuthorizedNavigator/>
    </NavigationContainer>
  )
}

function AuthorizedNavigator() {
  return (
    <DrawerStack.Navigator initialRouteName="PostTabs" drawerContentOptions={themeOptions}>
      <DrawerStack.Screen name="PostTabs" component={BottomBtnNavigator} options={{title: 'Posts'}}/>
      <DrawerStack.Screen name="About" component={AboutScreenNavigator} />
      <DrawerStack.Screen name="Create" component={CreateScreenNavigator} />
    </DrawerStack.Navigator>
  )
}

function AboutScreenNavigator() {
  return (
    <AboutScreenStack.Navigator screenOptions={screenOptions}>
      <AboutScreenStack.Screen name="About" component={AboutScreen} options={({navigation}) => ({
        ...takePhotoOptions(navigation),
        ...drawerOptions(navigation)
      })}/>
    </AboutScreenStack.Navigator>
    )
}

function CreateScreenNavigator(){
  return (
    <CreateScreenStack.Navigator screenOptions={screenOptions}>
      <CreateScreenStack.Screen name="Create" component={CreateScreen} options={({navigation}) => ({
        ...drawerOptions(navigation)
      })}/>
    </CreateScreenStack.Navigator>
    )
}


function BottomBtnNavigator() {
  return (
    <BottomBtnTabStack.Navigator 
      screenOptions={screenOptions}
      tabBarOptions={themeOptions}
      >
      <BottomBtnTabStack.Screen name="Post" component={PostNavigator} options={{tabBarIcon: info => <Ionicons name={'ios-albums'} size={25} color={info.color}/>}} />
      <BottomBtnTabStack.Screen name="Booked" component={BookedNavigator} options={{tabBarIcon: info => <Ionicons name={'ios-star'} size={25} color={info.color}/>}}/>
    </BottomBtnTabStack.Navigator>
  )
}

function PostNavigator() {
  return (
  <PostScreenStack.Navigator screenOptions={screenOptions} >
    <PostScreenStack.Screen name="Main" component={MainScreen} options={({navigation}) => ({
      title: 'Posture', 
      ...takePhotoOptions(navigation),
      ...drawerOptions(navigation)
      })}/>
    <PostScreenStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ 
      title: 'Post N ' + route.params.postId,
      headerRight: () => 
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Booked' iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'} onPress={() => console.log('press')}/>
      </HeaderButtons>,
      })}/>
  </PostScreenStack.Navigator>)
}

function BookedNavigator(){
  return(
    <BookedScreenStack.Navigator screenOptions={screenOptions}>
      <BookedScreenStack.Screen name="Booked" component={BookedScreen} options={({navigation}) => ({
        ...takePhotoOptions(navigation),
        ...drawerOptions(navigation)
      })}/>
      <BookedScreenStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ 
        title: 'Post N ' + route.params.postId,
        headerRight: () => 
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title='Take photo' iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'} onPress={() => console.log('press')}/>
        </HeaderButtons>,
        })}/>
    </BookedScreenStack.Navigator>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ?  THEME.COLOR_ACTIVE_PRIMARY : '#fff',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.COLOR_ACTIVE_PRIMARY,
}

const drawerOptions = (navigation) => ({
  headerLeft: () => 
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Take photo' iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    </HeaderButtons>
})

const takePhotoOptions = (navigation) => ({
  headerRight: () => 
  <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item title='Take photo' iconName='ios-camera' onPress={() => navigation.navigate('Create', { screen: 'Create' })}/>
  </HeaderButtons>,
}) 

const themeOptions = {
  activeTintColor: THEME.COLOR_SECONDARY_ACTIVE_PRIMARY,
  inactiveTintColor: THEME.COLOR_ACTIVE_LIGHT,
}