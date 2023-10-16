import React, { useState, useRef } from 'react';
import { View, Alert, FlatList, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BText, BButton, ModalMenuNote, Header } from '@components';
import { makeStyles } from './styles';
import { useThemeApp } from '@theme';
import { Note } from '@models';
import { Utilities } from '@utils';
import { ListNote } from '../list-note';

export const NoteScreen: React.FC = ({ navigation }) => {
    const { colors } = useThemeApp();
    const styles = makeStyles(colors);

    const refList = useRef<FlatList>(null);

    const [listNote, setListNote] = useState<Note[]>([]);
    const [currentIndexEditing, setCurrentIndexEditing] = useState<number>(0);
    const [isVisibleModalMenuNote, setVisibleModalMenuNote] =
        useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            getNotesFromStorage();
        }, []),
    );

    async function getNotesFromStorage() {
        const notes = await Utilities.getNotes();
        setListNote(notes);
    }

    // User want to edit the note
    const onEditNote = (noteIndex: number) => {
        setCurrentIndexEditing(noteIndex);
        navigation.navigate('NoteDetail', {
            noteDetail: listNote[noteIndex],
            callback: getNotesFromStorage,
        });
    };

    // User want to delete the note
    const onDeleteNote = (noteIndex: number) => {
        setCurrentIndexEditing(noteIndex);
        showAlertComfirmAndDelete(noteIndex);
    };

    // The options menu is displayed
    const onShowMenu = (noteIndex: number) => {
        setCurrentIndexEditing(noteIndex);
        setVisibleModalMenuNote(true);
    };

    // User selects Edit on the options menu
    const onPressMenuEdit = () => {
        setVisibleModalMenuNote(false);
        onEditNote(currentIndexEditing);
    };

    // User selects Delete on the options menu
    const onPressMenuDelete = () => {
        setVisibleModalMenuNote(false);
        onDeleteNote(currentIndexEditing);
    };

    // Tap create button to add a new note
    const onPressAddMore = () => {
        navigation.navigate('NoteDetail', { callback: getNotesFromStorage });
    };

    // Show alert to confirm and delete the note
    const showAlertComfirmAndDelete = (indexDelete: number) => {
        Alert.alert(
            'Delete note',
            'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await Utilities.deleteNote(listNote[indexDelete]);
                        getNotesFromStorage();
                    },
                },
            ],
            { cancelable: true },
        );
    };

    const currentNoteEditing =
        currentIndexEditing !== null && currentIndexEditing !== undefined
            ? listNote[currentIndexEditing]
            : undefined;

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Security Note" testID="header-navigation-note" />
            <View style={styles.content}>
                <ListNote
                    ref={refList}
                    notes={listNote}
                    style={styles.list}
                    onPressEdit={onEditNote}
                    onPressDelete={onDeleteNote}
                    onShowMenu={onShowMenu}
                />
                <BButton
                    testID="home-create-new-note-button"
                    style={styles.btnFab}
                    onPress={onPressAddMore}>
                    <BText style={styles.txtFab}>+</BText>
                </BButton>
            </View>
            <ModalMenuNote
                isVisible={isVisibleModalMenuNote}
                onClose={() => setVisibleModalMenuNote(false)}
                onPressEdit={onPressMenuEdit}
                onPressDelete={onPressMenuDelete}
                note={currentNoteEditing}
            />
        </SafeAreaView>
    );
};
