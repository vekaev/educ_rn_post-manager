
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/Main';
import { PostScreen } from './src/screens/Post';
import { AboutScreen } from './src/screens/About';
import { BookedScreen } from './src/screens/Booked';
import { CreateScreen } from './src/screens/Create';
import { THEME } from './src/theme';
import { Platform, Text } from 'react-native';
import { AppHeaderIcon } from './src/components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const PostStack = createStackNavigator();
const BookedStack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

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
      <BottomTab.Navigator 
        screenOptions={screenOptions}
        tabBarOptions={{
          activeTintColor: THEME.COLOR_SECONDARY_ACTIVE_PRIMARY,
          inactiveTintColor: THEME.COLOR_ACTIVE_LIGHT,
        }}
        >
        <BottomTab.Screen name="Post" component={PostNavigator} options={{tabBarIcon: info => <Ionicons name={'ios-albums'} size={25} color={info.color}/>}} />
        <BottomTab.Screen name="Booked" component={BookedNavigator} options={{tabBarIcon: info => <Ionicons name={'ios-star'} size={25} color={info.color}/>}}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

const screenOptions= {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ?  THEME.COLOR_ACTIVE_PRIMARY : '#fff',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.COLOR_ACTIVE_PRIMARY,
}

function PostNavigator() {
  return (
  <PostStack.Navigator screenOptions={screenOptions} >
    <PostStack.Screen name="Main" component={MainScreen} options={{title: 'Posture', headerRight: () => 
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title='Take photo' iconName='ios-camera' onPress={() => console.log('press')}/>
        </HeaderButtons>,
      headerLeft: () => 
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Take photo' iconName='ios-menu' onPress={() => console.log('press')}/>
      </HeaderButtons>}}/>
    <PostStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ 
      title: 'Post N ' + route.params.postId,
      headerRight: () => 
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Take photo' iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'} onPress={() => console.log('press')}/>
      </HeaderButtons>,
      })}/>
    <PostStack.Screen name="About" component={AboutScreen} />
    
    <PostStack.Screen name="Create" component={CreateScreen} />
  </PostStack.Navigator>)
}

function BookedNavigator(){
  return(
    <BookedStack.Navigator screenOptions={screenOptions}>
      <BookedStack.Screen name="Booked" component={BookedScreen} />
      <PostStack.Screen name="Post" component={PostScreen} options={({ route }) => ({ 
        title: 'Post N ' + route.params.postId,
        headerRight: () => 
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title='Take photo' iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'} onPress={() => console.log('press')}/>
        </HeaderButtons>,
        })}/>
    </BookedStack.Navigator>
   
  )
}