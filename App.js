import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
// SCREENS
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import AccountCreation from './screens/AccountCreation'
import HomeScreen from './screens/Home'
import Loader from './screens/Loader'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setLogStatus } from './redux/actions/index_actions'
// FIREBASE
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { setCurrentUserID, setCurrentUserData, setWelcomeScreen } from './redux/actions/index_actions'
import Welcome from './screens/Welcome';
// DEPENDENCIES
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const App = () => {

  // AUTHENTIFICATION WATCH FOR CHANGE
  const onAuthStateChanged = (user) => {
    if (user)
        dispatch(setLogStatus(true))
    else
        dispatch(setLogStatus(false))
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber // unsubscribe on unmount
    }, [])

  // REDUX
  const dispatch = useDispatch()
  const UserID = useSelector(state => state.UserID)
  const UserData = useSelector(state => state.UserData)
  const isLogged = useSelector(state => state.isLogged)
  const isWelcomeScreen = useSelector(state => state.isWelcomeScreen)

  // CHANGE LOG STATUS
  useEffect(() => {
    if (isLogged) {
      var user = auth().currentUser;
      if (user) {
        dispatch(setCurrentUserID(user._user.uid))
        dispatch(setWelcomeScreen(true))
      }
    }
    else
      dispatch(setCurrentUserID(null))
  }, [isLogged])

  // SAVE ALL DATABASE CHANGES IN REDUX STATE
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${UserID}/`)
      .on('value', snapshot => {
        dispatch(setCurrentUserData(snapshot.val()))
      })
    return () => {
      database()
        .ref(`/users/${UserID}/`)
        .off('value', onValueChange)
    }
  }, [UserID])

  if (!isLogged)
    return (
      <NavigationContainer headerMode="none">
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />        
        </Stack.Navigator>
      </NavigationContainer>
    )
  else if (isLogged && UserData && UserData.status.isNew)
    return (
      <NavigationContainer headerMode="none">
        <Stack.Navigator
          initialRouteName="AccountCreation"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AccountCreation" component={AccountCreation}/>     
        </Stack.Navigator>
      </NavigationContainer>
    )
  else if (isLogged && UserData && !UserData.status.isNew && !isWelcomeScreen) {
    return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    )    
  }
  else if (isWelcomeScreen)
    return (
      <Welcome />
    )
  else
    return (
      <Loader />
    )
}

const styles = StyleSheet.create({

});

export default App;
