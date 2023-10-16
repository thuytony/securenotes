import React, { useState } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import { BButton, BInput, Header } from '@components';
import { Note } from '@models';
import { useThemeApp } from '@theme';
import { makeStyles } from './styles';
import { Utilities } from '@utils';

export const NoteDetailScreen: React.FC = ({ route, navigation }) => {
    const noteDetail = route?.params?.noteDetail as Note | undefined;
    const callback = route?.params?.callback as Function | undefined;

    const { colors } = useThemeApp();
    const styles = makeStyles(colors);
    const [isEdit, setIsEdit] = useState<boolean>(Boolean(noteDetail));

    const [title, setTitle] = useState<string>(noteDetail?.title || '');
    const [content, setContent] = useState<string>(noteDetail?.content || '');

    const handleChangeTitle = (text: string) => {
        setTitle(text);
    };

    const handleChangeContent = (text: string) => {
        setContent(text);
    };

    const onSaveNote = async () => {
        const isValidData = title && content;
        if (!isValidData) {
            return;
        }

        const currentTime = new Date().getTime();
        if (isEdit) {
            await Utilities.updateNote(
                new Note(noteDetail?.id!!, `${currentTime}`, title, content),
            );
        } else {
            await Utilities.addNote(
                new Note(currentTime, `${currentTime}`, title, content),
            );
        }
        if (callback && typeof callback === 'function') {
            callback();
        }
        navigation.goBack();
    };

    const isValidData = title && content;

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={isEdit ? 'Update note' : 'Create a new note'}
                hasBack
                onPressBack={() => navigation.goBack()}
            />
            <View style={styles.note}>
                <BInput
                    placeholder="Please input the title"
                    autoFocus
                    blurOnSubmit={false}
                    value={title}
                    onChangeText={handleChangeTitle}
                    style={styles.edtTitle}
                    multiline
                    maxLength={100}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    placeholder="Please input the content"
                    blurOnSubmit={false}
                    value={content}
                    onChangeText={handleChangeContent}
                    style={styles.edtContent}
                    multiline
                    maxLength={600}
                    underlineColorAndroid="transparent"
                />
                <BButton
                    testID="button-save-note"
                    onPress={onSaveNote}
                    disabled={!isValidData}
                    title={isEdit ? 'Update' : 'Save'}
                    mode="contained"
                    style={styles.btnSave}
                />
            </View>
        </SafeAreaView>
    );
};
