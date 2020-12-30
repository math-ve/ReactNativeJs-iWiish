import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
// STYLE
import LinearGradient from 'react-native-linear-gradient'
import { MailSvg, KeySvg, CrossSvg, CheckSvg } from '../utils/svg/index_svg'
// COMPS
import AuthHero from '../components/auth/AuthHero'
import AuthSocials from '../components/auth/AuthSocials'
import AuthNav from '../components/auth/AuthNav'
// FIREBASE
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
// TOOLS
import email_validation from '../utils/signup_validations/email_validation'
import {is_pass_valid, does_they_match} from '../utils/signup_validations/password_validation'
import { newUserDataWithMailDB } from '../utils/user_creation/new_user_data'

GoogleSignin.configure({
    webClientId: '532835773031-itvna2f3ffno1ifp7ql7k7lktjfe23ue.apps.googleusercontent.com',
  });

const SignUp = (props) => {

    // PROPS
    const { navigation } = props;

    // LOCAL STATE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const [isEmailValid, setIsEmailValid] = useState("unset")
    const [isPassValid, setIsPassValid] = useState("unset")
    const [doPassMatch, setDoPassMatch] = useState("unset")

    const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState(false);

    const [input1Focus, setInput1Focus] = useState(false)
    const [input2Focus, setInput2Focus] = useState(false)
    const [input3Focus, setInput3Focus] = useState(false)

    // CREATE USER WITH MAIL
    const createNewUserWithMail = () => {
        if (isEmailValid === true && isPassValid === true && doPassMatch === true) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => newUserDataWithMailDB(res))
                .catch(err => {
                    if (err.code === "auth/email-already-in-use")
                        setIsEmailAlreadyUsed(true);
                })            
        }
        else
            Alert.alert("Oups..", "Champ(s) invalide(s)")
    }

    return (
        <View style={styles.container}>
            <AuthHero />
            <View style={styles.content_container}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>Crée ton compte</Text>
                </View>
                <View style={styles.form_container}>
                    <View>
                        <View style={[styles.input_container, input1Focus ? {backgroundColor: 'white'} : {}]}>
                            <View style={styles.svg_left_container}>
                                <CheckSvg style={[styles.svg_left, isEmailValid === true ? {display : 'flex'} : {display : 'none'}]}/>
                            </View>
                            <View style={styles.svg_left_container}>
                                <CrossSvg style={[styles.svg_left, isEmailValid === false ? {display : 'flex'} : {display : 'none'}]}/>
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Adresse e-mail"
                                onFocus={() => setInput1Focus(true)}
                                onChangeText={(text) => {
                                    setEmail(text)
                                    setIsEmailAlreadyUsed(false)
                                }}
                                onBlur={() => {
                                    setInput1Focus(false);
                                    setIsEmailValid(email_validation(email));
                                }}
                            />
                            <MailSvg width={20} height={14} style={styles.svg}/>
                        </View>
                        <View style={[styles.error_container, isEmailValid === false ? {display: 'flex'} : {display : 'none'}]}>
                            <Text style={styles.error_text}>Adresse e-mail invalide</Text>
                        </View>                        
                        <View style={[styles.error_container, isEmailAlreadyUsed ? {display: 'flex'} : {display : 'none'}]}>
                            <Text style={styles.error_text}>Cette adresse est déjà utilisée</Text>
                        </View>                        
                    </View>
                    <View>
                        <View style={[styles.input_container, input2Focus ? {backgroundColor: 'white'} : {}]}>
                            <View style={styles.svg_left_container}>
                                <CheckSvg style={[styles.svg_left, isPassValid === true ? {display : 'flex'} : {display : 'none'}]}/>
                            </View>
                            <View style={styles.svg_left_container}>
                                <CrossSvg style={[styles.svg_left, isPassValid === false ? {display : 'flex'} : {display : 'none'}]}/>
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Mot de passe"
                                secureTextEntry={true}
                                onFocus={() => {
                                    setInput2Focus(true)
                                }}
                                onBlur={() => {
                                    setInput2Focus(false)
                                    setIsPassValid(is_pass_valid(password))
                                }}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <KeySvg width={20} height={19} style={styles.svg}/>
                        </View>
                        <View style={[styles.error_container, isPassValid === false ? {display: 'flex'} : {display : 'none'}]}>
                            <Text style={styles.error_text}>(6 Caractères minimums dont un chiffre et une majuscule)</Text>
                        </View>                        
                    </View>
                    
                    <View>
                        <View style={[styles.input_container, input3Focus ? {backgroundColor: 'white'} : {}]}>
                            <View style={styles.svg_left_container}>
                                <CheckSvg style={[styles.svg_left, doPassMatch === true ? {display : 'flex'} : {display : 'none'}]}/>
                            </View>
                            <View style={styles.svg_left_container}>
                                <CrossSvg style={[styles.svg_left, (doPassMatch === false && password !== "") ? {display : 'flex'} : {display : 'none'}]}/>
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Vérifiez votre mot de passe"
                                secureTextEntry={true}
                                onFocus={() => setInput3Focus(true)}
                                onBlur={() => {
                                    setInput3Focus(false)
                                    setDoPassMatch(does_they_match(password, passwordConf))
                                }}
                                onChangeText={(text) => setPasswordConf(text)}
                            />
                            <KeySvg width={20} height={19} style={styles.svg}/>
                        </View>
                        <View style={[styles.error_container, (doPassMatch === false && password !== "") ? {display: 'flex'} : {display : 'none'}]}>
                            <Text style={styles.error_text}>Les mots de passes ne correspondent pas</Text>
                        </View>                         
                    </View>
    
                    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => createNewUserWithMail()}>
                        <LinearGradient
                            colors={['#FA7A47', '#FF5791']}
                            style={styles.linear_gradient_btn}
                            start={{x : 0.013, y : 1}}
                            end={{x : 1.829, y : -1.093}}
                        >
                            <Text style={styles.button_text}>S'inscrire</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.ou_container}>
                    <Text style={styles.ou}>Ou</Text>
                </View>
                <AuthSocials />
                <AuthNav 
                    to="SignIn"
                    text="Déjà inscrit ?"
                    link="Connecte-toi"
                    navigation={navigation}
                />
            </View>
        </View>
    )
}   

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'#F0F1F5'
    },
    content_container: {
        flex: 3,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    title_container: {
        flex: 23,        
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-SemiBold',
    },
    form_container: {
        height: 180,
        flex: 44,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input_container: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FA7A47',
        flexWrap:'wrap'
    },
    inputs: {
        width:'80%',
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        padding: 0,
        flex: 1
    },
    input_focus: {
        backgroundColor: 'white'
    },
    button: {
        borderRadius: 5,
    },
    linear_gradient_btn : {
        borderRadius: 10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:35,
        paddingRight:35,
        justifyContent: 'center',
    },
    button_text: {
        fontSize: 18,
        paddingBottom:3,
        fontFamily: 'Quicksand-Bold',
        color: 'white'
    },
    ou_container: {
        flex: 14,
        justifyContent: 'center'
    },
    ou: {
        fontSize: 19,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-SemiBold',
    },
    svg : {
        position: 'absolute',
        right: 5,
    },
    svg_left_container : {
        justifyContent: 'center',
        position: 'absolute',
        left: -5,
    },
    error_container:{
        display: 'none'
    },
    error_text: {
        fontSize:11,
        color: 'red',
        position:'absolute'
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

export default SignUp;