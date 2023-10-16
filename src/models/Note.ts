export class Note {
    id: number;
    key: string;
    title: string;
    content: string;

    constructor(id: number, key: string, title: string, content: string) {
        this.id = id;
        this.key = key;
        this.title = title;
        this.content = content;
    }
}
