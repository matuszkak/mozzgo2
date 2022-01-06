// bug: belépéskori szinkronizációnál 0-t tölt fel (nincs még adat és nem frissít szinkronban)


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';

import { loginStatus } from '../auth';
import { getUserDataByEmail } from '../database';
import { storeUserData } from '../localStorage';
import useStepCounter from './Logics/CounterLogic';
import DbSync from './Logics/DbSync';

// import assets
import logo from '../assets/footz.jpg';
import appname from '../assets/Mozzgogif2.gif';


export default function Home(props) {


    const [weeklySteps, setweeklySteps] = useStepCounter();

    useEffect(() => {
        (async () => {
            const firebaseUser = await loginStatus();
            const userData = await getUserDataByEmail(firebaseUser.email);
            await storeUserData(userData);
            console.log(`${userData.name} received when innerpage loaded`);
            props.setUserData(userData);
        })();
    }, []);

    useEffect(() => {
        (async () => {

            console.log("Database synced. Weekly steps Home: " + weeklySteps);
            DbSync(props.userData, weeklySteps);
        })();
    }, [weeklySteps]);

    return (
        <View style={styles.container} >
            <View style={styles.logoutSection}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Settings')
                }>
                    <Text style={styles.logoutButtonText}> Settings </Text>
                </TouchableOpacity>
            </View>

            < Text style={{ color: '#148F77', fontSize: 28, fontWeight: '300', marginTop: 40, marginBottom: 20 }} > Szia {props.userData.name} !</Text>

            <Image source={logo} style={{ width: 100, height: 100, marginBottom: -10 }} />
            <Image source={appname} style={{ width: 150, height: 100, marginBottom: -20 }} />

            <View style={styles.inputContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Motivate')}
                        style={styles.buttonView} >
                        <Text style={styles.buttonText}> Motivate </Text>
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