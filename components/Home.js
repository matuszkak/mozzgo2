// bug: belépéskori szinkronizációnál 0-t tölt fel (nincs még adat és nem frissít szinkronban)

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';

import { loginStatus } from '../auth';
import { getUserDataByEmail } from '../database';
import { storeUserData } from '../localStorage';
import DbSync from './Logics/DbSync';
// import useStepCounter from './Logics/CounterLogic';

import logo from '../assets/footz.jpg';
import appname from '../assets/Mozzgogif2.gif';

export default function Home(props) {

    const [actual, setActual] = useState(false);
    const [firsttime, setFirsttime] = useState(true);
    const [dayend, setDayend] = useState(new Date().setHours(23, 59, 59, 999));

    let [fontsLoaded] = useFonts({
        'AvenirNextHeavyItalic': require('../assets/fonts/AvenirNextHeavyItalic.ttf'),
        'AvenirNextULtltalic': require('../assets/fonts/AvenirNextULtltalic.ttf'),
        'AvenirNextDemiItalic': require('../assets/fonts/AvenirNextDemiItalic.ttf'),
        'AvenirNextHeavyCondensed': require('../assets/fonts/AvenirNextHeavyCondensed.ttf'),
    });

    useEffect(() => {

        (async () => {
            const firebaseUser = await loginStatus();
            const userData = await getUserDataByEmail(firebaseUser.email);
            await storeUserData(userData);
            console.log(`${userData.name} received when innerpage loaded ${props.weeklySteps}`);
            props.setUserData(userData);
        })();
    }, []);

    useEffect(() => {
        setDayend(new Date().setHours(23, 59, 59, 999));
        const delay = dayend - new Date();
        if (firsttime) {
            setTimeout(() => {
                DbSync(props.userData, props.weeklySteps);
                if (actual) { setActual(false) } else { setActual(true) };
                setFirsttime(false);
            }, delay);
        } else {
            setTimeout(() => {
                DbSync(props.userData, props.weeklySteps);
                if (actual) { setActual(false) } else { setActual(true) };
            }, 86400000);
        };

        console.log(firsttime + " first time?");
        console.log(props.appTime + " appTime");
        console.log(new Date(dayend) + " dayend");
        console.log(delay / 3600000 + " hours until day change");
        console.log(actual + " - aktuális már az adatbázis?");

    }, [actual]);


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        return (
            <View style={styles.container} >
                <View style={styles.logoutSection}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Settings')
                    }>
                        <Text style={styles.logoutButtonText}> Settings </Text>
                    </TouchableOpacity>
                </View>

                < Text style={{ color: '#148F77', fontSize: 28, fontFamily: 'AvenirNextDemiItalic', fontWeight: '200', marginTop: 40, marginBottom: 120 }} > Szia {props.userData.name}!</Text>

                <Image source={logo} style={{ width: 100, height: 100, marginBottom: -10 }} />
                <Image source={appname} style={{ width: 150, height: 100, marginBottom: -20 }} />

                <Text style={{ color: '#148F77', fontSize: 18, fontFamily: 'AvenirNextDemiItalic', fontWeight: '300', marginTop: 10, marginBottom: 20 }}>Move your ass watch this go up: {props.weeklySteps[0] + 0}</Text>

                {/* Home menu */}
                <View style={styles.inputContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Motivate')}
                            style={styles.buttonView} >
                            <Text style={styles.buttonText}>Motivation</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Chart')}
                            style={styles.buttonView} >
                            <Text style={styles.buttonText}>   Chart   </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Step history')}
                            style={styles.buttonView} >
                            <Text style={styles.buttonText}> History </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    appTitle: {
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 30,
    },
    logoutSection: {
        alignSelf: 'stretch',
    },
    logoutButton: {
        alignSelf: 'stretch',
    },
    logoutButtonText: {
        marginRight: 'auto',
        fontStyle: 'italic',
        color: 'blue',
    },
    statusText: {
        fontSize: 18,
        margin: 15,
    },
    button: {
        margin: 50,
        alignSelf: 'stretch',
        textAlign: 'center',
        paddingVertical: '5%',
        paddingHorizontal: '7%',
        borderRadius: 20,
        color: 'blue',
        backgroundColor: '#0091ff',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
    },
    inputContainer: {
        paddingTop: '0%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonView: {
        elevation: 8,
        backgroundColor: '#009688',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '400',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
});