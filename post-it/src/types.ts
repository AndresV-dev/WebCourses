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
    status: number,
    createdAt: Date,
    endAt: Date,
    userId: number,
    priorityId?: number,
    collectionId?: number,
    categoryId?: number
}

export interface TaskPriority {
    id: number,
    description: string,
    name: string
}

export interface AvailableInfoType {
    collection: string,
    category: string, 
    registers: number
}

export interface SearchUtil{
    collection: string;
    category: string;
}

export enum Role {
    'ADMIN',
    'USER'
}