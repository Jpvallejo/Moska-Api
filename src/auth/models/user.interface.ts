export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string
}

export interface PartialUser {
    email: string;
    firstName: string;
    lastName: string;
}