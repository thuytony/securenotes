import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Header, BText, BButton, BInput } from '@components';
import { makeStyles } from './styles';
import { useThemeApp } from '@theme';
import { useSecurity } from '@contexts';
import { Alert } from 'react-native';

const rnBiometrics = new ReactNativeBiometrics();

export const AuthenticationScreen: React.FC<any> = () => {
    const { colors } = useThemeApp();
    const styles = makeStyles(colors);
    const { setShowNote } = useSecurity();
    const [isSupportBiometric, setSupportBiometric] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        // Check if the device supports biometric authentication
        rnBiometrics.isSensorAvailable().then(result => {
            const { biometryType } = result;
            if (biometryType) {
                setSupportBiometric(true);
            } else {
                setSupportBiometric(false);
            }
        });
    }, []);

    const requestBiometricAccess = () => {
        // Request biometric
        rnBiometrics
            .simplePrompt({
                promptMessage: 'Authenticate to access the app',
            })
            .then(result => {
                if (result.success) {
                    // Biometric successful, navigate to the notes screen
                    console.log('Biometric authentication success');
                    showNoteScreen();
                } else {
                    console.log('Biometric authentication failed');
                    Alert.alert('Biometric authentication failed');
                    // Handle the case where biometric fails
                }
            })
            .catch(error => {
                console.error('Biometric authentication error', error);
            });
    };

    const submitPassword = () => {
        // Check the password and grant access if it's correct
        console.log('on submit password: ', password);
        if (password === '123456') {
            // Navigate to the notes screen
            console.log('Password authentication success');
            showNoteScreen();
        } else {
            console.log('Password authentication failed');
            Alert.alert('Password authentication failed');
            // Handle the case where the password is incorrect
        }
    };

    const showNoteScreen = () => {
        setShowNote(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Authenticate to access Notes"
                hasBack
                testID="header-navigation-authentication"
            />
            <View style={styles.content}>
                {isSupportBiometric ? (
                    <View style={styles.wrapBiometric}>
                        <BButton
                            title="Access with Biometrics"
                            onPress={requestBiometricAccess}
                            mode="outlined"
                            testID="button-request-biometric"
                        />
                    </View>
                ) : (
                    <View>
                        <BText
                            style={styles.message}
                            testID="header-message-biometric-type">
                            {isSupportBiometric
                                ? 'Access notes with Biometrics'
                                : 'Please enter your password to access notes.'}
                        </BText>
                        <BInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.edtInput}
                            testID="input-password"
                        />
                        <BButton
                            title="Submit Password"
                            onPress={submitPassword}
                            mode="contained"
                            testID="button-submit-password"
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
