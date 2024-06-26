export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export enum Entity {
    BOARDS = 'boards',
    TASKS = 'tasks'
}

export enum ColumnTitle {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done'
}
