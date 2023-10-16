/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    LogBox,
    View,
    StatusBar,
    useColorScheme,
    StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import { SecurityProvider } from '@contexts';
import { Note } from '@models';
import { RootApp } from '@navigation';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export type RootAppNavigationParams = {
    Authen: undefined;
    ListNote: undefined;
    AddNote: Note | undefined;
};

const App: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <SecurityProvider>
                <RootApp />
            </SecurityProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
