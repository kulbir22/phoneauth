import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import auth, { } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/app-check';

export default function AppCheck() {
    const rnfbProvider = firebase.appCheck().newReactNativeFirebaseAppCheckProvider();
    rnfbProvider.configure({
        android: {
            provider: __DEV__ ? 'debug' : 'playIntegrity',
            debugToken: '0FDEF550-CD01-4F01-B129-BABD8404B763'
        }
    });
    firebase.appCheck().initializeAppCheck({
        provider: rnfbProvider,
        isTokenAutoRefreshEnabled: true
    })

    firebase.appCheck().getToken().then((response) => {
        console.log("@@@@@@ GET TOKEN: ", response)
    }).catch((error) => {
        console.log("^&^&^&^ TOKEN ERROR: ", error)
    })
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        console.log("@#@#@# PHONE NUMBER CALLED")
        const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        console.log("#@#@#@# CONFIRMATION: ", confirmation)
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            console.log('Success');
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    if (!confirm) {
        return (
            <Button
                title="Phone Number Sign In"
                onPress={() => signInWithPhoneNumber('+91 9501263426')}
            />
        );
    }

    return (
        <>
            <TextInput value={code} onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} />
        </>
    );
}
