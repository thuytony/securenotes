import React from 'react';
import { FlatList, ViewStyle, ListRenderItemInfo } from 'react-native';
import { EmptyList } from '@components';
import { NoteItem } from './NoteItem';
import { makeStyles } from './styles';
import { useThemeApp } from '@theme';
import { Note } from '@models';

interface ListNoteProps {
    notes: Note[];
    style?: ViewStyle;
    onPressEdit: (indexNoteEdit: number) => void;
    onPressDelete: (indexNoteEdit: number) => void;
    onShowMenu: (indexNoteEdit: number) => void;
}

export const ListNote = React.forwardRef((props: ListNoteProps, ref) => {
    const { colors } = useThemeApp();
    const styles = makeStyles(colors);
    const { notes } = props;

    const keyExtractor = (item: Note, index: number) => `${item.key}`;

    const renderEmpty = () => {
        return (
            <EmptyList
                message={'Want to take notes?\nCreate a new one now! 🌟'}
            />
        );
    };

    const renderItem = ({ item, index }: ListRenderItemInfo<Note>) => {
        const { onPressEdit, onPressDelete, onShowMenu } = props;
        return (
            <NoteItem
                note={item}
                noteIndex={index}
                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
                onShowMenu={onShowMenu}
            />
        );
    };

    return (
        <FlatList
            ref={ref}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            data={notes}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    );
});
