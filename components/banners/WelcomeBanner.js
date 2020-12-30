import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native'
// REDUX
import { useSelector } from 'react-redux'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
// FIREBASE
import database from '@react-native-firebase/database'

const WelcomeBanner = (props) => {

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // LOCAL STATE
    const [step, setStep] = useState(0)

    // REMOVE WELCOME BANNER
    const reamoveWelcomeBanner = () => {
        database()
            .ref(`/users/${UserData.userID}/status/ShowWelcomeBanner`)
            .set(false)
    }

    if (step === 0)
        return (
            <View style={styles.ctn}>
                <View style={styles.text_1_ctn}>
                    <Text style={styles.text_1}>Bienvenue sur iWiish {UserData.infos.name} !</Text>
                </View>
                <View style={styles.text_2_ctn}>
                    <Text style={styles.text_2}>
                        <Text style={styles.link_btn}>Crée ta première liste</Text> et partage-la ensuite avec tes proches !
                    </Text>
                </View>
                <View style={styles.text_3_ctn}>
                    <Text style={styles.text_3}>
                        <Text style={styles.link_btn}>Cherche la liste</Text> d'un ami à l'aide de son nom d'utilisateur ou de son listID
                    </Text>
                </View>
                <View style={styles.gotit_btn_ctn}>
                    <TouchableOpacity onPress={() => setStep(1)}>
                        <LinearGradient
                            colors={['#FA7A47', '#FF5791']}
                            style={{flex : 1}}
                            start={{x : 0.013, y : 1}}
                            end={{x : 1.829, y : -1.093}}
                            style={styles.gotit_btn}
                        >
                            <Text style={styles.gotit_btn_text}>J'ai compris</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    else
        return (
            <View style={styles.ctn}>
                <View style={styles.text_2_ctn}>
                    <Text style={styles.text_2}>Si tu as besoin d'aide pour utiliser iWiish, tu peux consulter le   <Text style={styles.link_btn}>{'\n'}Guide d'utilisation</Text>
                    </Text>
                </View>
                <View style={styles.text_2_ctn}>
                    <Text style={styles.text_2}>
                        Celui-ci est disponible en bas de chaque page de l'aplication
                    </Text>
                </View>
                <View style={styles.gotit_btn_ctn}>
                    <TouchableOpacity onPress={() => reamoveWelcomeBanner()}>
                        <LinearGradient
                            colors={['#FA7A47', '#FF5791']}
                            style={{flex : 1}}
                            start={{x : 0.013, y : 1}}
                            end={{x : 1.829, y : -1.093}}
                            style={styles.gotit_btn}
                        >
                            <Text style={styles.gotit_btn_text}>J'ai compris</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>            
        )
}

const styles = StyleSheet.create({
    ctn: {
        width: '100%',
        height: 200,
        backgroundColor: '#464767',
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 13,
        paddingBottom: 13,
        justifyContent: 'space-between',
        alignItems:'flex-start',
    },
    text_1_ctn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent:'center'
    },
    text_1: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: '#F0F1F5',
        textAlign: 'center'
    },
    text_2_ctn: {
        flexDirection: 'row',
        alignItems:'flex-start',
    },
    text_2: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#F0F1F5',
        textAlign: 'center'
    },
    link_btn: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#FA7A47'
    },
    text_3_ctn: {
        flexDirection: 'row',
        alignItems:'flex-start'
    },
    text_3: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#F0F1F5',
        textAlign: 'center'
    },
    gotit_btn_ctn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    gotit_btn: {
        paddingHorizontal: 30,
        paddingVertical: 4,
        borderRadius: 5
    },
    gotit_btn_text: {
        color: '#F0F1F5',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    }
})

export default WelcomeBanner