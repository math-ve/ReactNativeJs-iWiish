import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Animated, Easing } from 'react-native'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
// STYLE
import Logo from '../assets/svg/iwiish_logo.svg'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setWelcomeScreen } from '../redux/actions/index_actions'

const Welcome = (props) => {

    // PROPS
    const { removeWelcomeScreen } = props

    var slideUpValue1 = new Animated.Value(0)
    var fadeInValue2 = new Animated.Value(0)
    var slideUpValue2 = new Animated.Value(0)
    var fadeInValue3 = new Animated.Value(0)

    // REDUX
    const dispatch = useDispatch()
    const UserData = useSelector(state => state.UserData)


    useLayoutEffect(() => {
        _start()
        setTimeout(() => {
            dispatch(setWelcomeScreen(false))
        }, 5000)
    })

    // ANIMATIONS
    const _start = () => {
        Animated.stagger(200, [
            Animated.timing(slideUpValue1, {
                toValue: 1,
                duration: 1500,
                easing: Easing.bounce,
                useNativeDriver: true
            }),
            Animated.timing(fadeInValue2, {
                toValue: 1,
                duration: 1500,
                easing: Easing.circle,
                useNativeDriver: true
            }),
            Animated.timing(slideUpValue2, {
                toValue: 1,
                duration: 1500,
                easing: Easing.bounce,
                useNativeDriver: true
            }),
            Animated.timing(fadeInValue3, {
                toValue: 1,
                duration: 1500,
                easing: Easing.circle,
                useNativeDriver: true
            })
        ]).start()
    }

    return (
        <LinearGradient
            colors={['#FA7A47', '#FF5791']}
            style={styles.ctn}
            start={{x : 0.013, y : 1}}
            end={{x : 1.829, y : 1}}
        >
            <Animated.View style={[styles.logo_ctn]}>
                <Logo width={54} height={54}/>
                <Text style={styles.logo}>iWiish</Text>
            </Animated.View>
            <View style={styles.img_ctn}>
                <Animated.View style={[styles.outline_border, {opacity: fadeInValue2, transform: [
                    {
                        translateY: slideUpValue1.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -30]
                        })
                    }
                ]}]}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: UserData ? UserData.infos.photoURL : null
                        }}
                    />
                </Animated.View>
            </View>
            <Animated.View style={[styles.text_ctn, {opacity: fadeInValue3, transform: [
                {
                    translateY: slideUpValue2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -30]
                    })
                }
            ]}]}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={styles.text}>
                        Bienvenue
                    </Text>
                    <Text style={[styles.text, {marginLeft: 10}]}>
                        {UserData ? UserData.infos.name : ""}
                    </Text>                    
                </View>
                
            </Animated.View>
            <View style={{position: 'absolute', bottom: 0}}>
                <ActivityIndicator size="large" color="white" style={{marginBottom: 50}}/>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    ctn: {
        flex: 1,
        alignItems: 'center'
    },
    logo_ctn: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logo: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 36,
        color: 'white',
        opacity: 0.87,
        paddingBottom:8,
        marginLeft:10
    },
    img_ctn: {
        flex: 6.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 30
    },
    outline_border: {
        borderWidth:2,
        borderColor: 'rgba(255,255,255,0.63)',
        height:200,
        width: 200,
        borderRadius:200/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        borderWidth: 3,
        borderColor: 'white',
        width: '93%',
        height:'93%',
        borderRadius: 95,
    },
    text_ctn: {
        flex: 4.5,
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        color: 'white'
    }
})

export default Welcome