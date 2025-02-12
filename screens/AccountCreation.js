import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// STYLE
import LinearGradient from 'react-native-linear-gradient'
import { LogoSvg } from '../utils/svg/index_svg'
// FIREBASE
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserID, setLogStatus, setWelcomeScreen } from '../redux/actions/index_actions'
// COMPS
import ProfilePhotoEdit from '../components/auth/ProfilePhotoEdit'
import AccountCreationForm from '../components/auth/AccountCreationForm'
import PhotoProfilePickBlured from '../components/photo_picker/PhotoProfilePickBlured'


const AccountCreation = () => {

    // REDUX
    const dispatch = useDispatch()
    const UserData = useSelector(state => state.UserData)

    // LOCAL STATE
    const [isPhotoPicking, setIsPhotoPicking] = useState(false)

    // SIGN OUT
    const signOut = () => {
        dispatch(setCurrentUserID(null))
        dispatch(setLogStatus(false))
        auth().signOut()
    }

    // PHOTO EDITING
    const handleClickPhoto = (bool) => {
        setIsPhotoPicking(bool)
    }

    // SUBMIT FORM
    const handleSubmit = (name, surname, username) => {
        database()
            .ref(`/users/${UserData.userID}/infos/`)
            .update({
                name: name,
                surname: surname,
                username: username
            }).then(async () => {
                database()
                    .ref(`/users/${UserData.userID}/status/isNew`)
                    .set(false)
            }).then(async () => {
                database()
                    .ref(`/usernames/${username}`)
                    .set(UserData.userID)
            }).then(() => dispatch(setWelcomeScreen(true)))
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <LinearGradient
                colors={['#FA7A47', '#FF5791']}
                style={styles.container_bg}
                start={{x : 0.013, y : 1}}
                end={{x : 1.829, y : 1}}
            >
                <View style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                    <View style={styles.header_container}>
                        <LogoSvg />
                        <Text style={styles.logo}>iWiish</Text>
                    </View>
                    <ProfilePhotoEdit handleClick={handleClickPhoto}/>
                    <AccountCreationForm handleSubmit={handleSubmit}/>
                    <View style={styles.back_container}>
                        <TouchableOpacity onPress={() => signOut()}>
                            <Text style={styles.back_text}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                    {isPhotoPicking ? 
                        <PhotoProfilePickBlured handleBack={handleClickPhoto}/> :
                        <></>
                    }
                        
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container_bg: {
        flex: 1,
    },      
    scroll_ctn: {
        flex: 1,
    },
    scroll_ctn_content: {
        minHeight: '100%',
        //justifyContent: 'space-between'
    },
    header_container: {
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 36,
        color: 'white',
        opacity: 0.87,
        paddingBottom:8,
        marginLeft:10
    },
    back_container: {
        justifyContent: 'center',
        alignItems:'center',
    },
    back_text: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        textTransform: 'uppercase'
    }
})

export default AccountCreation;