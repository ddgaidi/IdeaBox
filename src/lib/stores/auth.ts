import { writable } from 'svelte/store';

export interface User {
    pseudo: string;
    email: string;
    id: string;
}

export const user = writable<User | null>(null);
export const isAuthenticated = writable<boolean>(false);