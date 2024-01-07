export interface Task {
    id: number;
    title: string;
    text: string;
    boardId: number;
    userNames: string[];
    labelIds: number[];
}
