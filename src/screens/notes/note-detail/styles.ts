import { StyleSheet } from 'react-native';
import { Dimension, ColorType } from '@theme';

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        note: {
            padding: Dimension.margin.base,
            flex: 1,
        },
        title: {
            fontSize: Dimension.text.big,
            color: colors.primary,
            marginBottom: Dimension.margin.large,
            fontWeight: 'bold',
        },
        edtTitle: {
            fontSize: Dimension.text.title,
            borderWidth: 1,
            borderColor: colors.primary,
            paddingTop: Dimension.margin.base,
            paddingBottom: Dimension.margin.base,
            paddingHorizontal: Dimension.margin.base,
            padding: Dimension.margin.base,
            borderRadius: Dimension.radius.small,
            textAlignVertical: 'top',
            maxHeight: 80,
        },
        edtContent: {
            fontSize: Dimension.text.title,
            borderWidth: 1,
            borderColor: colors.primary,
            paddingTop: Dimension.margin.base,
            paddingBottom: Dimension.margin.base,
            paddingHorizontal: Dimension.margin.base,
            marginTop: Dimension.margin.small,
            borderRadius: Dimension.radius.small,
            textAlignVertical: 'top',
            flex: 1,
        },
        btnSave: {
            marginTop: Dimension.margin.base,
        },
    });

export { makeStyles };
