import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
// FIREBASE
import database from '@react-native-firebase/database'
// TOOLS
import is_name_valid from '../../utils/signup_validations/names_validations'
import is_username_valid from '../../utils/signup_validations/username_validation'
// STYLE
import { CheckSvg, CrossSvg } from '../../utils/svg/index_svg'
// REDUX
import { useSelector } from 'react-redux'

const AccountCreationForm = (props) => {

    // PROPS
    const { handleSubmit } = props

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // LOCAL STATE
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [username, setUsername] = useState("")

    const [input1Focus, setInput1Focus] = useState(false)
    const [input2Focus, setInput2Focus] = useState(false)
    const [input3Focus, setInput3Focus] = useState(false)

    const [isNameValid, setIsNameValid] = useState("unset")
    const [isSurnameValid, setIsSurnameValid] = useState("unset")
    const [isUserNameValid, setIsUserNameValid] = useState("unset")

    const [errorUsername, setErrorUsername] = useState("")
    const [validUserNameText, setValidUserNameText] = useState("")

    const [isLoading, setIsLoading] = useState(false)

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
        }
    }, [UserData])

    const is_username_valid_and_available = () => {
        if (is_username_valid(username)) {
            setIsLoading(true)
            database()
                .ref(`usernames/${username}`)
                .once('value')
                .then((res) => {
                    if (res.val()) {
                        setIsUserNameValid(false)
                        setErrorUsername("Nom d'utilisateur déjà utilisé")
                        setIsLoading(false)
                        console.log("uername already used")
                    }
                    else {
                        setIsUserNameValid(true)
                        setErrorUsername("")
                        setValidUserNameText("Nom d'utilisateur disponible")
                        setIsLoading(false)
                        console.log("uername available")
                    }
                });
        }
        else {
            setIsUserNameValid(false)
            setErrorUsername("Nom d'utilisateur invalide")
            Alert.alert(
                "Nom d'utilisateur invalide",
                "Caractères autorisés : \n> Lettres\n> Chiffres\n> _ et - \n(min. 5)"
            )
            console.log("Invalid username")
            return false
        }
    }

    // CHECK IF VALID BEFORE SUBMIT
    const checkIfValidBeforeSumbit = () => {
        if (isNameValid === true && isSurnameValid === true && isUserNameValid === true)
            handleSubmit(name, surname, username)
        else
            Alert.alert("Oups..", "Champ(s) invalide(s)")
    }

    return (
        <View style={styles.form_ctn}>
            <View style={styles.inputs_ctn}>

                <View style={styles.input_and_label_ctn}>
                    <View style={styles.input_ctn}>
                        <View style={styles.svg_left_ctn}>
                            <CheckSvg style={[styles.svg, isNameValid && isNameValid !== "unset" ? {display : 'flex'} : {display : 'none'}]}/>
                        </View>
                        <View style={styles.svg_left_ctn}>
                            <CrossSvg style={[styles.svg, !isNameValid ? {display : 'flex'} : {display : 'none'}]}/>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            placeholderTextColor="white"
                            defaultValue={UserData ? UserData.infos.name : ""}
                            onChangeText={(text) => setName(text)}
                            onFocus={() => {
                                setInput1Focus(true)
                                setIsNameValid("unset")
                            }}
                            onBlur={() => {
                                setInput1Focus(false)
                                setIsNameValid(is_name_valid(name))
                            }}
                        />                    
                    </View>
                    <View style={[styles.infos_text_ctn, !isNameValid && name !== "" ? {display : 'flex'} : {display : 'none'}]}>
                        <Text style={styles.error_text}>Caratères non-autorisés</Text>
                    </View>       
                    <View style={[styles.infos_text_ctn, !input1Focus && !isNameValid && name === "" ? {display : 'flex'} : {display : 'none'}]}>
                        <Text style={styles.error_text}>Champ requis</Text>
                    </View>       
                </View>

                <View style={styles.input_and_label_ctn}>
                    <View style={styles.input_ctn}>
                        <View style={styles.svg_left_ctn}>
                            <CheckSvg style={[styles.svg, isSurnameValid && isSurnameValid !== "unset" ? {display : 'flex'} : {display : 'none'}]}/>
                        </View>
                        <View style={styles.svg_left_ctn}>
                            <CrossSvg style={[styles.svg, !isSurnameValid ? {display : 'flex'} : {display : 'none'}]}/>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            placeholderTextColor="white"
                            onChangeText={(text) => setSurname(text)}
                            defaultValue={UserData ? UserData.infos.surname : ""}
                            onFocus={() => {
                                setInput2Focus(true)
                                setIsSurnameValid("unset")
                            }}
                            onBlur={() => {
                                setInput2Focus(false)
                                setIsSurnameValid(is_name_valid(surname))
                            }}
                        />                    
                    </View>
                    <View style={[styles.infos_text_ctn, !isSurnameValid && surname !== "" ? {display : 'flex'} : {display : 'none'}]}>
                        <Text style={styles.error_text}>Caratères non-autorisés</Text>
                    </View>
                    <View style={[styles.infos_text_ctn, !input2Focus && !isSurnameValid && surname === "" ? {display : 'flex'} : {display : 'none'}]}>
                        <Text style={styles.error_text}>Champ requis</Text>
                    </View>     
                </View>

                <View style={styles.input_and_label_ctn}>
                    <View style={styles.input_ctn}>
                        <View style={styles.svg_left_ctn}>
                            <CheckSvg style={[styles.svg, isUserNameValid && isUserNameValid !== "unset" ? {display : 'flex'} : {display : 'none'}]}/>
                        </View>
                        <View style={styles.svg_left_ctn}>
                            <CrossSvg style={[styles.svg, !isUserNameValid ? {display : 'flex'} : {display : 'none'}]}/>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor="white"
                            onChangeText={(text) => setUsername(text)}
                            onFocus={() => setInput3Focus(true)}
                            onBlur={() => {
                                setInput3Focus(false)
                                is_username_valid_and_available()
                            }}
                            maxLength={20}
                        />
                        <ActivityIndicator
                            style={styles.loader}
                            color="white"
                            animating={isLoading}
                        />           
                    </View>
                    <View style={[styles.infos_text_ctn, !isUserNameValid ? {display : 'flex'} : {display : 'none'}]}>
                        <Text style={styles.error_text}>{errorUsername}</Text>
                    </View>
                    <View style={[styles.infos_text_ctn, isUserNameValid && isUserNameValid !== "unset" ? {display : 'flex'} : {display : 'none'}]}>
                        <Text style={styles.valid_text}>Nom d'utilisateur disponible</Text>
                    </View>                              
                </View>

            </View>
            <View style={styles.btn_ctn}>
                <TouchableOpacity style={styles.sumbit_btn} onPress={() => checkIfValidBeforeSumbit()}>
                    <Text style={styles.sumbit_btn_text}>C'est parti !</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form_ctn: {
        flex: 43,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop:15
    },
    inputs_ctn: {
        flex: 63,
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:20,
        width:'100%',
    },
    input_and_label_ctn: {
        width:'100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    input_ctn: {
        width: '85%',
        alignItems:'center',
        backgroundColor: 'rgba(255,255,255,0.30)',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center'

    },
    input: {
        width: '100%',
        textAlign: 'center',
        padding: 0,
        paddingTop:3.5,
        paddingBottom: 3.5,
        fontSize:18,
        fontFamily: 'Montserrat-Regular',
        backgroundColor: 'rgba(255,255,255,0.30)',
    },
    loader : {
        position: 'absolute',
        right: 5

    },
    svg_left_ctn: {
        position: 'absolute',
        left: 5,
        top:10
    },
    infos_text_ctn: {
        width:'85%',
        flexDirection: 'row',
    },
    infos_text: {
        color: 'white',
    },
    error_text: {
        color: 'yellow',
        position: 'absolute'
    },
    valid_text: {
        color: '#00ff0c',
        position:'absolute'
    },
    btn_ctn: {
        flex: 30,
        justifyContent: 'flex-end',
        paddingBottom:15
    },
    sumbit_btn : {
        backgroundColor: 'white',
        paddingRight: 40,
        paddingLeft:40,
        paddingTop:5,
        paddingBottom: 7,
        borderRadius: 7,
        elevation:10

    },
    sumbit_btn_text: {
        fontSize: 19,
        fontFamily: 'Montserrat-SemiBold',
        color: '#FA7A47',
    }
})

export default AccountCreationForm