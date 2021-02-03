import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// STYLE
import LinearGradient from 'react-native-linear-gradient'
import { MailSvg, KeySvg } from '../utils/svg/index_svg'
// COMPS
import AuthHero from '../components/auth/AuthHero'
import AuthNav from '../components/auth/AuthNav'
import AuthSocials from '../components/auth/AuthSocials'
// FIREBASE
import auth from '@react-native-firebase/auth'
// TOOLS
import is_email_valid from '../utils/signup_validations/email_validation'
// REDUX
import { useDispatch } from 'react-redux'
import { setLogStatus } from '../redux/actions/index_actions'

const SignIn = (props) => {

    // PROPS
    const { navigation } = props;

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isEmailValid, setIsEmailValid] = useState("unset")
    const [isUserWithThisEmail, setIsUserWithThisEmail] = useState("unset")
    const [isWrongPassword, setIsWrongPassword] = useState("unset")

    const [input1Focus, setInput1Focus] = useState(false)
    const [input2Focus, setInput2Focus] = useState(false)

    // REDUX
    const dispatch = useDispatch()

    // HANDLE FORM SUBMIT
    const handleSubmit = () => {
        if (isEmailValid && password !== "")
            auth().signInWithEmailAndPassword(email, password)
                .then(() => dispatch(setLogStatus(true)))
                .catch((err) => {
                    console.log(err.code)
                    if (err.code === 'auth/user-not-found')
                        setIsUserWithThisEmail(false)
                    else if (err.code === 'auth/wrong-password')
                        setIsWrongPassword(true)
                })
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                <AuthHero />
                <View style={styles.content_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>Connecte-toi</Text>
                    </View>
                    <View style={styles.form_container}>
                        <View>
                            <View style={[styles.input_container, input1Focus ? {backgroundColor: 'white'} : {}]}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholder="Adresse e-mail"
                                    onFocus={() => {
                                        setInput1Focus(true)
                                        setIsEmailValid("unset")
                                        setIsUserWithThisEmail("unset")
                                    }}
                                    onBlur={() => {
                                        setInput1Focus(false)
                                        setIsEmailValid(is_email_valid(email))
                                    }}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                <MailSvg width={20} height={14} style={styles.svg}/>
                            </View>
                            <View style={[styles.error_ctn, isEmailValid === false ? {display: 'flex'} : {display : 'none'}]}>
                                <Text style={styles.error_text}>Adresse e-mail invalide</Text>
                            </View>                        
                            <View style={[styles.error_ctn, isUserWithThisEmail === false ? {display: 'flex'} : {display : 'none'}]}>
                                <Text style={styles.error_text}>Aucun compte iWiish trouvé avec cette adresse</Text>
                            </View>                        
                        </View>
                        
                        <View>
                            <View style={[styles.input_container, input2Focus ? {backgroundColor: 'white'} : {}]}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                    onFocus={() => {
                                        setInput2Focus(true)
                                        setIsWrongPassword("unset")
                                    }}
                                    onBlur={() => setInput2Focus(false)}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <KeySvg width={20} height={19} style={styles.svg}/>
                            </View>
                            <View style={[styles.error_ctn, isWrongPassword === true ? {display: 'flex'} : {display : 'none'}]}>
                                <Text style={styles.error_text}>Mot de passe incorrect</Text>
                            </View>                
                        </View>

                        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => handleSubmit()}>
                            <LinearGradient
                                colors={['#FA7A47', '#FF5791']}
                                style={styles.linear_gradient_btn}
                                start={{x : 0.013, y : 1}}
                                end={{x : 1.829, y : -1.093}}
                            >
                                <Text style={styles.button_text}>S'identifier</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ou_container}>
                        <Text style={styles.ou}>Ou</Text>
                    </View>
                    <AuthSocials />
                    <AuthNav 
                        to="SignUp"
                        text="Nouveau ici ?"
                        link="S'inscrire"
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    scroll_ctn : {
        flex: 1,
        backgroundColor:'#F0F1F5',
    },
    scroll_ctn_content: {
        //justifyContent: 'space-between',
        minHeight: '100%'
    },
    content_container: {
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 35,
        flex: 1,
    },
    title_container: {      
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 19,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-SemiBold',
    },
    form_container: {
        height: 180,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input_container: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FA7A47',
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
    error_ctn: {

    },
    error_text: {
        position: 'absolute',
        color: 'red',
        fontSize: 11
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
        justifyContent: 'center',
        marginVertical: 15
    },
    ou: {
        fontSize: 19,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-SemiBold',
    },
    svg : {
        position: 'absolute',
        right: 5
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

export default SignIn;