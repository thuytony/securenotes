import EncryptedStorage from 'react-native-encrypted-storage';
import { Constants } from '@constants';
import { Note } from '@models';
const Utilities = {
    getNotes: async (): Promise<Note[]> => {
        try {
            const notes = await EncryptedStorage.getItem(Constants.STORAGE_KEY);

            if (notes) {
                const notesJsonData = JSON.parse(notes);
                if (notesJsonData && Array.isArray(notesJsonData)) {
                    return notesJsonData;
                }
            }
            return [];
        } catch (error) {
            // There was an error on the native side
            console.log('No JSON data stored.');
            return [];
        }
    },
    addNote: async (note: Note) => {
        try {
            const notes = await Utilities.getNotes();
            notes?.push(note);
            // Convert JSON data to a string before storing
            const notesAsString = JSON.stringify(notes);
            await EncryptedStorage.setItem(
                Constants.STORAGE_KEY,
                notesAsString,
            );
        } catch (error) {
            // There was an error on the native side
            console.log('Add note with an error');
        }
    },
    updateNote: async (note: Note) => {
        try {
            const notes = await Utilities.getNotes();
            const index = notes.findIndex(element => element.id === note.id);
            if (index > -1) {
                notes[index] = note;
                // Convert JSON data to a string before storing
                const notesAsString = JSON.stringify(notes);
                await EncryptedStorage.setItem(
                    Constants.STORAGE_KEY,
                    notesAsString,
                );
            } else {
                console.log('Could not found the element');
            }
        } catch (error) {
            // There was an error on the native side
            console.log('Add note with an error');
        }
    },
    deleteNote: async (note: Note) => {
        try {
            const notes = await Utilities.getNotes();
            const index = notes.findIndex(element => element.id === note.id);
            if (index > -1) {
                const newNotes = [...notes];
                newNotes.splice(index, 1);
                // Convert JSON data to a string before storing
                const notesAsString = JSON.stringify(newNotes);
                await EncryptedStorage.setItem(
                    Constants.STORAGE_KEY,
                    notesAsString,
                );
            } else {
                console.log('Could not found the element');
            }
        } catch (error) {
            // There was an error on the native side
            console.log('Delete note with an error');
        }
    },
};

export { Utilities };
