import React from 'react';
import { StyleSheet, Text, TextStyle, TextProps } from 'react-native';
import { useThemeApp, ColorType } from '@theme';

type BTextProps = {
    style?: TextStyle;
    children?: React.ReactNode | string;
};

const BText: React.FC<BTextProps & TextProps> = (
    props: BTextProps & TextProps,
) => {
    const { style, children } = props;

    const { colors } = useThemeApp();
    const styles = makeStyles(colors);

    const textStyle = StyleSheet.flatten([styles.text, style]);

    return (
        <Text {...props} style={textStyle}>
            {children}
        </Text>
    );
};

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        text: {
            color: colors.text,
        },
    });

export { BText };
