declare global {
    namespace App {
        interface Locals {
            user: {
                id: string;
                pseudo: string;
                email: string;
            } | null;
        }
    }
}

export {};