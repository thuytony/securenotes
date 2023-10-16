import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Dimension, useThemeApp, ColorType } from '@theme';
import { BText } from '@components';
import { ICONS } from '@assets';

interface HeaderProps {
    title?: string;
    hasBack?: boolean;
    onPressBack?: () => void;
    testID?: string;
}

export const Header: React.FC<HeaderProps> = props => {
    const {
        title = '',
        hasBack = false,
        onPressBack = () => {},
        testID,
    } = props;

    const { colors } = useThemeApp();
    const styles = makeStyles(colors);

    return (
        <>
            <View style={styles.header}>
                {hasBack ? (
                    <Pressable onPress={onPressBack} style={styles.backButton}>
                        <Image
                            source={ICONS.ICON_BACK}
                            style={styles.btnBack}
                            resizeMode="contain"
                        />
                    </Pressable>
                ) : (
                    <View style={styles.backButton} />
                )}
                <BText testID={testID} style={styles.title}>
                    {title}
                </BText>
            </View>
            <View style={styles.divider} />
        </>
    );
};

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Dimension.margin.small,
            marginTop: Dimension.margin.small,
        },
        title: {
            flex: 1,
            fontSize: Dimension.text.big,
            marginHorizontal: Dimension.margin.base,
            textAlign: 'center',
            fontWeight: '600',
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnBack: {
            width: 20,
            height: 20,
        },
        divider: {
            width: '60%',
            height: 1,
            backgroundColor: colors.border,
            alignSelf: 'center',
            marginTop: Dimension.margin.base,
            marginBottom: Dimension.margin.large,
        },
    });
