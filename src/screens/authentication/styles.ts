import { StyleSheet } from 'react-native';
import { Dimension, ColorType } from '@theme';

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        content: {
            flex: 1,
            padding: Dimension.margin.base,
        },
        wrapBiometric: {
            flex: 1,
            justifyContent: 'center',
            padding: Dimension.margin.base,
        },
        message: {
            fontStyle: 'italic',
            fontSize: Dimension.text.title,
            textAlign: 'center',
        },
        edtInput: {
            borderColor: colors.border,
            borderWidth: 1,
            padding: Dimension.margin.base,
            borderRadius: Dimension.radius.small,
            marginTop: Dimension.margin.base,
            marginBottom: Dimension.margin.large,
        },
    });

export { makeStyles };
