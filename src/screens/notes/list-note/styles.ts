import { StyleSheet } from 'react-native';
import { Dimension, ColorType } from '@theme';

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        note: {
            flexDirection: 'row',
            padding: Dimension.margin.base,
            alignItems: 'center',
            shadowColor: colors.backdrop,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            margin: Dimension.margin.small,
            backgroundColor: colors.background,
            borderRadius: Dimension.radius.small,
        },
        itemContent: {
            flex: 1,
            flexDirection: 'row',
        },
        wrapTitle: {
            flex: 1,
        },
        txtNoteName: {
            fontSize: Dimension.text.title,
        },
        txtNoteContent: {
            fontSize: Dimension.text.body,
            color: colors.textSecondary,
        },
        wrapDelete: {
            padding: Dimension.margin.small * 1.2,
            backgroundColor: colors.border,
            borderRadius: 30,
        },
        iconDelete: {
            width: Dimension.icon.tiny,
            height: Dimension.icon.tiny,
            tintColor: colors.error,
        },
        divider: {
            height: Dimension.margin.small,
        },
    });

export { makeStyles };
