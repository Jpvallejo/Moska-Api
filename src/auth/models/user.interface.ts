export interface User {
    id: string,
    email: string,
    displayName: string,
}

export interface PartialUser {
    email: string;
    displayName: string;
}