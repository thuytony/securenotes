import React from 'react';
import { StyleSheet, View, ModalProps, Image } from 'react-native';
import { Note } from '@models';
import { ICONS } from '@assets';
import { BModal, BText, BButton } from '../core';
import { Dimension, useThemeApp, ColorType } from '@theme';

export interface ModalMenuNoteProps extends ModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPressEdit: (note?: Note) => void;
    onPressDelete: (note?: Note) => void;
    note: Note | undefined;
}

export const ModalMenuNote: React.FC<ModalMenuNoteProps> = props => {
    const { isVisible, onClose, onPressEdit, onPressDelete, note } = props;

    const { colors } = useThemeApp();
    const styles = makeStyles(colors);

    const onModalShow = () => {};

    // Choose the edit option
    const onPressMenuEdit = () => {
        onPressEdit(note);
    };

    // Choose the delete option
    const onPressMeuDelete = () => {
        onPressDelete(note);
    };

    return (
        <BModal
            testID="modal-menu-options"
            isVisible={isVisible}
            onRequestClose={onClose}
            onModalShow={onModalShow}>
            <View style={styles.modalContainer}>
                <BButton onPress={onPressMenuEdit} style={styles.row}>
                    <Image source={ICONS.ICON_EDIT} style={styles.iconEdit} />
                    <BText style={styles.labelEdit}>Edit note</BText>
                </BButton>
                <View style={styles.divider} />
                <BButton
                    testID="button-delete-task"
                    onPress={onPressMeuDelete}
                    style={styles.row}>
                    <Image
                        source={ICONS.ICON_DELETE}
                        style={styles.iconDelete}
                    />
                    <BText style={styles.labelDelete}>Delete note</BText>
                </BButton>
            </View>
        </BModal>
    );
};

const makeStyles = (colors: ColorType) =>
    StyleSheet.create({
        modalContainer: {
            padding: Dimension.margin.base,
        },
        row: {
            flexDirection: 'row',
        },
        labelEdit: {},
        labelDelete: {
            color: colors.error,
        },
        divider: {
            marginVertical: Dimension.margin.base,
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
        },
        iconDelete: {
            width: Dimension.icon.tiny,
            height: Dimension.icon.tiny,
            tintColor: colors.error,
            marginRight: Dimension.margin.base,
        },
        iconEdit: {
            width: Dimension.icon.tiny,
            height: Dimension.icon.tiny,
            tintColor: colors.text,
            marginRight: Dimension.margin.base,
        },
    });
