export interface User {
    id: number,
    uuid: string,
    role: string,
    name: string,
    lastname: string,
    age: number,
    username: string,
    password: string,
    email: string,
    token: string,
    json?: JSON,
    created_at: Date,
    userImage?: string,
    taskCollections?: UserTaskCollections[]
}

export interface UserTaskCollections {
    id: number,
    description: string,
    name: string,
    user_id: number
}

export interface Task {
    id: number,
    uuid: string,
    tittle: string,
    description: string,
    created_at: Date,
    end_at?: Date,
    user_id: number,
    priority_id?: number,
    collection_id?: number,
    category_id?: number
}

export interface TaskPriority {
    id: number,
    description: string,
    name: string
}

export enum Role {
    'ADMIN',
    'USER'
}