/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthenticationScreen, NoteDetailScreen, NoteScreen } from '@screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSecurity } from '@contexts';

export type RootAppNavigationParams = {
    Authen: undefined;
    NoteScreen: undefined;
    NoteDetail: undefined;
};

const Stack = createStackNavigator<RootAppNavigationParams>();

const RootApp: React.FC = () => {
    const { isShowNote } = useSecurity();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isShowNote ? (
                    <>
                        <Stack.Screen
                            name="NoteScreen"
                            component={NoteScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="NoteDetail"
                            component={NoteDetailScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Authen"
                            component={AuthenticationScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { RootApp };
