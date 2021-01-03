import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
// SCREENS
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import AccountCreation from './screens/AccountCreation'
import HomeScreen from './screens/Home'
import Loader from './screens/Loader'
import Settings from './screens/Settings'
import ListCreation from './screens/ListCreation'
import Mylist from './screens/Mylist'
import MylistEdit from './screens/MyListEdit'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setLogStatus, savePresetImgUrls, savePresetCoverUrls } from './redux/actions/index_actions'
// FIREBASE
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { setCurrentUserID, setCurrentUserData, setWelcomeScreen } from './redux/actions/index_actions'
import Welcome from './screens/Welcome';
// DEPENDENCIES
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// UTILS
import { get_pictures_urls, get_covers_urls} from './utils/preset_images/get_preset_img_url'

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

  // SAVE PRESET IMAGES URL IN REDUX STATE
  useEffect(() => {
    if (UserData) {
      const ref = storage().ref("preset_images/")
      get_pictures_urls(ref, undefined).then((res) => {
        dispatch(savePresetImgUrls(res))
      })
      const ref2 = storage().ref("preset_cover/")
      get_covers_urls(ref2, undefined).then((res) => {
        dispatch(savePresetCoverUrls(res))
      })      
    }
  }, [UserData])

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
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ListCreation" component={ListCreation} />
            <Stack.Screen name="MyList" component={Mylist} />
            <Stack.Screen name="MyListEdit" component={MylistEdit} />
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
