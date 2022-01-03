import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';
import { loginStatus } from '../auth';
import { getUserDataByEmail } from '../database';
import { storeUserData } from '../localStorage';

export default function StatusPage(props) {

    const [link, setLink] = useState('');

    useEffect(() => {
        (async () => {
            const firebaseUser = await loginStatus();
            const userData = await getUserDataByEmail(firebaseUser.email);
            await storeUserData(userData);
            console.log(`${userData.name} received when innerpage loaded`);
            props.setUserData(userData);
            // generateImage();
        })();
    }, []);

    return (
        <View style={styles.container} >
            <View style={styles.logoutSection}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Settings')
                }>
                    <Text style={styles.logoutButtonText}> Settings < /Text>
                        < /TouchableOpacity>
                        < /View>

                        < Text style={styles.appTitle} > Szia {props.userData.name} !</Text>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Add steps')}
                            style={[styles.button, styles.shadow]} >
                            <Text style={styles.buttonText}> Add steps < /Text>
                                < /TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('History of steps')}
                                    style={[styles.button, styles.shadow]} >
                                    <Text style={styles.buttonText}> History < /Text>
                                        < /TouchableOpacity>
                                    </View>
                                    );
}

                                    const styles = StyleSheet.create({
                                        container: {
                                        padding: 10,
                                    alignItems: 'center',
                                    // https://stackoverflow.com/a/59183680/9004180
                                    // fixing the scrolling of the FlatList
                                    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
                                    flex: 1,
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
                                    buttonText: {
                                        textAlign: 'center',
                                    fontSize: 15,
                                    color: 'white',
    },
                                    shadow: {
                                        shadowColor: '#171717',
                                    shadowOffset: {width: -2, height: 4 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
    },
                                    image: {
                                        width: 400,
                                    height: 400,
                                    resizeMode: 'contain',
    },
});