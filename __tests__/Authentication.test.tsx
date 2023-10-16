/**
 * @format
 */

import React from 'react';
import {
    render,
    fireEvent,
    waitFor,
    screen,
} from '@testing-library/react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { act } from 'react-test-renderer';
import { RootApp } from '../src/navigation';
import { SecurityContext } from '@contexts';

jest.mock('react-native-biometrics');

jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    return Object.setPrototypeOf(
        {
            Alert: {
                ...RN.Alert,
                alert: jest.fn(),
            },
        },
        RN,
    );
});

const notAuthenContextMock = {
    isShowNote: false,
    setShowNote: jest.fn(),
};

const authenticatedContextMock = {
    isShowNote: true,
    setShowNote: jest.fn(),
};

beforeEach(() => {
    ReactNativeBiometrics.mockClear();
});

test('User opens the application on a phone that does not support Biometrics', async () => {
    jest.spyOn(
        ReactNativeBiometrics.prototype,
        'isSensorAvailable',
    ).mockImplementation(() => Promise.resolve({ biometryType: undefined }));

    let rerender;
    await waitFor(() => {
        const component = render(
            <SecurityContext.Provider value={notAuthenContextMock}>
                <RootApp />
            </SecurityContext.Provider>,
        );
        rerender = component.rerender;
    });

    // User should see the Authentication screen
    const authenticationLabel = screen.getByTestId(
        'header-navigation-authentication',
    );
    expect(authenticationLabel.props.children).toEqual(
        'Authenticate to access Notes',
    );

    // Users should be asked to enter a Password to access notes
    const biometricType = screen.getByTestId('header-message-biometric-type');
    expect(biometricType.props.children).toEqual(
        'Please enter your password to access notes.',
    );

    // User enters password
    const inputPassword = screen.getByTestId('input-password');
    fireEvent.changeText(inputPassword, '123456');
    expect(inputPassword.props.value).toBe('123456');

    const buttonSubmitPassword = screen.getByTestId('button-submit-password');
    fireEvent(buttonSubmitPassword, 'onPress');

    await act(async () => {
        await rerender(
            <SecurityContext.Provider value={authenticatedContextMock}>
                <RootApp />
            </SecurityContext.Provider>,
        );

        // The application should redirect the user to the Notes screen
        const homeLabel = screen.getByTestId('header-navigation-note');
        expect(homeLabel.props.children).toEqual('Security Note');
    });
});

test('User opens the application on a phone that support Touch ID', async () => {
    jest.spyOn(
        ReactNativeBiometrics.prototype,
        'isSensorAvailable',
    ).mockImplementation(() => Promise.resolve({ biometryType: 'Touch ID' }));

    let rerender;
    await waitFor(() => {
        const component = render(
            <SecurityContext.Provider value={notAuthenContextMock}>
                <RootApp />
            </SecurityContext.Provider>,
        );
        rerender = component.rerender;
    });

    // User should see the Authentication screen
    const authenticationLabel = screen.getByTestId(
        'header-navigation-authentication',
    );
    expect(authenticationLabel.props.children).toEqual(
        'Authenticate to access Notes',
    );

    jest.spyOn(
        ReactNativeBiometrics.prototype,
        'simplePrompt',
    ).mockImplementation(() => Promise.resolve({ success: true }));

    // Users should be asked to authenticate with Biometric to access notes
    const buttonRequestBiometric = screen.getByTestId(
        'button-request-biometric',
    );
    fireEvent(buttonRequestBiometric, 'onPress');

    await act(async () => {
        await rerender(
            <SecurityContext.Provider value={authenticatedContextMock}>
                <RootApp />
            </SecurityContext.Provider>,
        );

        // The application should redirect the user to the Notes screen
        const homeLabel = screen.getByTestId('header-navigation-note');
        expect(homeLabel.props.children).toEqual('Security Note');
    });
});
