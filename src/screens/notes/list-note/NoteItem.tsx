import React from 'react';
import { View, Image } from 'react-native';
import { BButton, BText } from '@components';
import { Note } from '@models';
import { ICONS } from '@assets';
import { useThemeApp } from '@theme';
import { makeStyles } from './styles';

interface NoteItemProps {
    note: Note;
    noteIndex: number;
    onPressEdit: (noteIndex: number) => void;
    onPressDelete: (noteIndex: number) => void;
    onShowMenu: (noteIndex: number) => void;
}

export const NoteItem: React.FC<NoteItemProps> = props => {
    const { note, noteIndex, onPressEdit, onPressDelete, onShowMenu } = props;

    const { colors } = useThemeApp();
    const styles = makeStyles(colors);

    // Tap to edit the note
    const onPressLable = () => {
        onPressEdit(noteIndex);
    };

    // Press and hold to display menu options
    const onLongPressLable = () => {
        onShowMenu(noteIndex);
    };

    // The user presses the delete icon to delete the note
    const onPressIconDelete = () => {
        onPressDelete(noteIndex);
    };

    const _renderLabel = () => {
        return (
            <BButton
                testID="button-update-note"
                onPress={onPressLable}
                onLongPress={onLongPressLable}>
                <BText style={styles.txtNoteName}>{note.title}</BText>
                <View style={styles.divider} />
                <BText style={styles.txtNoteContent}>{note.content}</BText>
            </BButton>
        );
    };

    const _renderIconDelete = () => {
        return (
            <View>
                <BButton onPress={onPressIconDelete} style={styles.wrapDelete}>
                    <Image
                        source={ICONS.ICON_DELETE}
                        style={styles.iconDelete}
                    />
                </BButton>
            </View>
        );
    };

    return (
        <View style={styles.note}>
            <View style={styles.itemContent}>
                <View style={styles.wrapTitle}>{_renderLabel()}</View>
                {_renderIconDelete()}
            </View>
        </View>
    );
};
