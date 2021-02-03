import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
import PhotoProfilePickBlured from '../components/photo_picker/PhotoProfilePickBlured'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserID, setLogStatus, setCurrentUserData } from '../redux/actions/index_actions'
// STYLE
import { LangSvg, Pencil2Svg, UserSvg } from '../utils/svg/index_svg'
import { TextInput } from 'react-native-gesture-handler'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// FIREBASE
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
// TOOLS
import is_name_valid from '../utils/signup_validations/names_validations'
import is_username_valid from '../utils/signup_validations/username_validation'

const Settings = () => {

    // LOCAL STATE
    const [isPhotoPicking, setIsPhotoPicking] = useState(false)

    const [isNameValid, setIsNameValid] = useState("unset")
    const [isSurnameValid, setIsSurnameValid] = useState("unset")
    const [isUserNameValid, setIsUserNameValid] = useState("unset")

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [username, setUsername] = useState("")

    const [isUsernameAlreadyUsed, setIsUsernameAlreadyUsed] = useState(false)
    const [errorName, setErrorName] = useState("")
    const [errorSurname, setErrorSurname] = useState("")
    const [errorUsername, setErrorUsername] = useState("")

    // REDUX
    const dispatch = useDispatch()
    const UserData = useSelector(state => state.UserData)

    // NAVIGATION
    const navigation = useNavigation()

    // SIGN OUT
    const SignOut = () => {
        dispatch(setCurrentUserID(null))
        dispatch(setLogStatus(false))
        dispatch(setCurrentUserData(null))
        auth().signOut()
    }

    // PHOTO EDITING
    const handleClickPhoto = (bool) => {
        setIsPhotoPicking(bool)
    }

    // SETTING INPUT VALUES
    useEffect(() => {
        if (UserData) {
            if (UserData.infos.name !== "") {
                setName(UserData.infos.name)
                setIsNameValid(true)
            }
            if (UserData.infos.surname !== "") {
                setSurname(UserData.infos.surname)
                setIsSurnameValid(true)    
            }
            if (UserData.infos.username !== "") {
                setUsername(UserData.infos.username)
                setIsUserNameValid(true)
            }             
        }
    }, [UserData])

    // CHECK IF NAME VALID
    const setNameValid = () => {
        if (is_name_valid(name)) {
            setIsNameValid(true)
            setErrorName("")
        }
        else {
            setIsNameValid(false)
            setErrorName("invalide")
        }
    }

    // CHECK IF SURNAME VALID
    const setSurnameValid = () => {
        if (is_name_valid(surname)) {
            setIsSurnameValid(true)
            setErrorSurname("")
        }
        else {
            setIsSurnameValid(false)
            setErrorSurname("invalide")
        }
    }

    // CHECK USERNAME VALIDITY
    const is_username_valid_and_available = () => {
        if (is_username_valid(username)) {
            database()
                .ref(`usernames/${username}`)
                .once('value')
                .then((res) => {
                    if (res.val()) {
                        if (UserData.infos.username === username) {
                            setIsUserNameValid(true)
                            setErrorUsername("")
                        }
                        else {
                            setIsUserNameValid(false)
                            setErrorUsername("Nom d'utilisateur déjà utilisé")
                        }    
                    }
                    else {
                        setIsUserNameValid(true)
                        setErrorUsername("")
                    }
                });
        }
        else {
            setIsUserNameValid(false)
            setErrorUsername("Nom d'utilisateur invalide")
            Alert.alert(
                "Nom d'utilisateur invalide",
                "Caractères autorisés : \n> Lettres\n> Chiffres\n> _ et - \n(min. 5 & max. 20)"
            )
            console.log("Invalid username")
            return false
        }
    }

    const handleSubmit = () => {
        if (isUserNameValid && isNameValid && isSurnameValid) {
            database()
                .ref(`/usernames/${UserData.infos.username}`)
                .remove()
                .then(() => {
                    database()
                        .ref(`/users/${UserData.userID}/infos`)
                        .update({
                            name: name,
                            surname: surname,
                            username: username
                        }).then(() => {
                            database()
                                .ref(`/usernames/${username}/`)
                                .set(UserData.userID)
                                .then(() => {
                                    navigation.goBack()
                                })
                        })
                })            
        }
        else
            Alert.alert(
                "Oups",
                "Champ(s) invalide(s).."
            )
    }

    return (
        <SafeAreaView style={{flex : 1}}>
            <TitleHeader title="Paramètres"/>
            <ScrollView style={styles.ctn} contentContainerStyle={styles.content_ctn}>
                <View style={styles.img_ctn}>
                    <TouchableOpacity style={styles.outline_border} onPress={() => handleClickPhoto(true)}>
                        <Image
                            style={styles.img}
                            source={{
                                uri: UserData ? UserData.infos.photoURL : null
                            }}
                        />
                        <View style={styles.edit_ctn}>
                            <Pencil2Svg />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.form_ctn}>
                    <View>
                        <View style={styles.username_ctn}>
                            <Text style={styles.label}>Nom d'utilisateur</Text>
                            <View style={isUserNameValid && isUserNameValid !== "unset" && UserData && UserData.infos.username !== username ? {display : 'flex'} : {display : 'none'}}>
                                <Text style={styles.valid_text}>Nom d'utilisateur disponible</Text>
                            </View>  
                            <View>
                                <Text style={styles.error_text}>{errorUsername}</Text>
                            </View>  
                            <View style={styles.input_ctn}>
                                <View style={styles.svg_ctn}>
                                    <UserSvg />
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nom d'utilisateur"
                                    defaultValue={UserData ? UserData.infos.username : ""}
                                    textAlign="center"
                                    maxLength={20}
                                    onChangeText={(text) => setUsername(text)}
                                    onFocus={() => {
                                        setIsUserNameValid("unset")
                                        setErrorUsername("")
                                    }}
                                    onBlur={() => {
                                        is_username_valid_and_available()
                                    }}
                                />
                            </View>   
                        </View>
      
                    </View>

                    <View style={styles.name_surname_ctn}>
                        <View style={styles.name_ctn}>
                            <Text style={styles.label}>Prénom</Text>
                            <View>
                                <Text style={styles.error_text}>{errorName}</Text>
                            </View> 
                            <View style={styles.input_ctn}>
                                <TextInput
                                    style={styles.input}
                                    defaultValue={UserData ? UserData.infos.name : ""}
                                    placeholder="Prénom"
                                    textAlign="center"
                                    maxLength={20}
                                    onChangeText={(text) => setName(text)}
                                    onFocus={() => {
                                        setErrorName("")
                                    }}
                                    onBlur={() => {
                                        setNameValid()
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.surname_ctn}>
                            <Text style={styles.label}>Nom</Text>
                            <View>
                                <Text style={styles.error_text}>{errorSurname}</Text>
                            </View> 
                            <View style={styles.input_ctn}>
                                <TextInput
                                    style={styles.input}
                                    defaultValue={UserData ? UserData.infos.surname : ""}
                                    placeholder="Nom"
                                    textAlign="center"
                                    maxLength={20}
                                    onChangeText={(text) => setSurname(text)}
                                    onFocus={() => {
                                        setErrorSurname("")
                                    }}
                                    onBlur={() => {
                                        setSurnameValid()
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.language_ctn}>
                        <Text style={styles.label}>Langue</Text>
                        <View style={styles.input_ctn}>
                            <View style={styles.svg_ctn}>
                                <LangSvg />
                            </View>
                            <TextInput
                                style={styles.input}
                                defaultValue={UserData ? UserData.settings.language : ""}
                                placeholder="Langue"
                                textAlign="center"
                                editable={false}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.save_ctn}>
                    <TouchableOpacity style={styles.save_btn} onPress={() => handleSubmit()}>
                        <LinearGradient
                            colors={['#FA7A47', '#FF5791']}
                            style={{flex : 1}}
                            start={{x : 0.013, y : 1}}
                            end={{x : 1.829, y : -1.093}}
                            style={styles.btn_gradiant}
                        >
                        <Text style={styles.save_text}>Enregistrer</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={[styles.deconnexion_ctn]}>
                    <TouchableOpacity style={[styles.deconnexion_btn]} onPress={() => SignOut()}>
                        <Text style={styles.deconnexion_text}>Se déconnecter</Text>
                    </TouchableOpacity>                        
                </View>
            </ScrollView>
            {isPhotoPicking ? 
                <PhotoProfilePickBlured handleBack={handleClickPhoto}/> :
                <></>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ctn: {
        flex: 1,
        backgroundColor:'#F0F1F5',
        paddingLeft: 20,
        paddingRight:20,
    },
    content_ctn :{
        justifyContent: 'space-around',
        flexGrow: 1
    },
    img_ctn: {
        //flex: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 15
    },
    outline_border: {
        width: 159,
        height: 159,
        borderWidth: 2,
        borderColor: '#FA7A47',
        borderRadius: 79.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 149,
        height: 149,
        borderRadius: 74.5
    },
    edit_ctn: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 12,
        borderRadius: 50,
        elevation: 10
    },
    form_ctn: {
        //flex: 40,
        justifyContent: 'space-between'
    },
    error_text: {
        position:'absolute',
        right:0,
        bottom: 0,
        marginBottom: 3,
        color: 'red',
        fontSize: 13
    },
    valid_text: {
        position:'absolute',
        right:0,
        bottom: 0,
        marginBottom: 3,
        color: 'green',
        fontSize: 13
    },
    username_ctn: {
        width: '100%',

    },
    name_surname_ctn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name_ctn: {
        width: '47%'
    },
    surname_ctn: {
        width: '47%'
    },
    label: {
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
        marginBottom:2
    },
    input_ctn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor:'#B1C3D0',
        height: 48,
    },
    svg_ctn: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
    },
    input: {
        padding: 0,
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: "#FA7A47"
    },
    save_ctn: {
        //flex: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_gradiant: {
        justifyContent: 'center',
        borderRadius: 10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:35,
        paddingRight:35,
        justifyContent: 'center',
        elevation: 10
    },
    save_btn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    save_text: {
        fontSize: 19,
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        paddingBottom:3
    },
    deconnexion_ctn: {
        //flex: 7,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    deconnexion_text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color:"#FA7A47"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4.65,
        elevation: 8,
    }

})

export default Settings