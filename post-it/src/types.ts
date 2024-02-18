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
    token?: string,
    json?: JSON,
    created_at: Date,
    userImage?: string,
    taskCollections?: UserTaskCollections[]
}

export interface UserTaskCollections {
    id: number,
    description: string,
    name: string,
    categories: Category[],
    user_id: number
}

export interface Category {
    id: number,
    name: string,
    description: string,
    collection_id: number
}

export interface Task {
    id: number,
    uuid: string,
    title: string,
    description: string,
    createdAt: Date,
    endAt?: Date,
    userId: number,
    priorityId?: number,
    collectionId?: number,
    categoryId?: number,
    category?: Category
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