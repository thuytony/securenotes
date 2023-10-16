import React from 'react';
import {
    StyleSheet,
    Pressable,
    GestureResponderEvent,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useThemeApp, ColorType, Dimension } from '@theme';
import { BText } from './index';

type BButtonProps = {
    mode?: 'text' | 'outlined' | 'contained';
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
    children?: React.ReactNode;
    title?: string;
    style?: ViewStyle;
    disabled?: boolean;
    testID?: string;
};

const BButton: React.FC<BButtonProps> = (props: BButtonProps) => {
    const {
        mode,
        onPress = () => {},
        onLongPress = () => {},
        children,
        title,
        style,
        disabled = false,
        testID,
    } = props;

    const { colors } = useThemeApp();
    const styles = makeStyles(colors);

    const getButtonStyle = (): {
        buttonStyle: ViewStyle;
        titleStyle: TextStyle;
    } => {
        let buttonStyle = styles.button;
        let titleStyle = styles.title;
        switch (mode) {
            case 'text': {
                buttonStyle = {
                    ...styles.button,
                    ...styles.buttonText,
                };
                titleStyle = {
                    ...styles.title,
                    ...styles.titleText,
                };
                break;
            }
            case 'outlined': {
                buttonStyle = {
                    ...styles.button,
                    ...styles.buttonOutlined,
                };
                titleStyle = {
                    ...styles.title,
                    ...styles.titleOutlined,
                };
                break;
            }
            case 'contained': {
                buttonStyle = {
                    ...styles.button,
                    ...styles.buttonContained,
                };
                titleStyle = {
                    ...styles.title,
                    ...styles.titleContained,
                };
                break;
            }
        }

        if (disabled) {
            buttonStyle = { ...buttonStyle, ...styles.buttonDisable };
        }

        return {
            buttonStyle: StyleSheet.flatten([buttonStyle, style]),
            titleStyle,
        };
    };

    const { buttonStyle, titleStyle } = getButtonStyle();

    return (
        <Pressable
            testID={testID}
            style={buttonStyle}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}>
            {title && <BText style={titleStyle}>{title}</BText>}
            {children}
        </Pressable>
    );
};

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        button: {},
        buttonText: {},
        buttonOutlined: {
            borderWidth: 1,
            borderColor: colors.button,
            borderRadius: Dimension.radius.base,
            padding: Dimension.margin.base,
            alignItems: 'center',
        },
        buttonContained: {
            borderWidth: 1,
            borderColor: colors.button,
            backgroundColor: colors.button,
            borderRadius: Dimension.radius.base,
            padding: Dimension.margin.base,
            alignItems: 'center',
        },
        buttonDisable: {
            backgroundColor: colors.buttonDisable,
        },
        title: {
            color: colors.button,
            fontSize: Dimension.text.title,
        },
        titleText: {},
        titleOutlined: {},
        titleContained: {
            color: colors.titleButton,
        },
        titleDisable: {},
    });

export { BButton };
