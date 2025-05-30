import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma';

export async function registerUser(pseudo: string, email: string, password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                pseudo,
                email,
                password: hashedPassword
            }
        });

        return { success: true, user: { id: user.id, pseudo: user.pseudo, email: user.email } };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, error: 'Le pseudo ou l\'email est déjà utilisé.' };
        }
        return { success: false, error: 'Une erreur est survenue lors de l\'inscription.' };
    }
}

interface User {
    id: string;
    pseudo: string;
    email: string;
}

interface AuthResult {
    success: boolean;
    user?: User;
    error?: string;
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return { success: false, error: 'Email ou mot de passe incorrect.' };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { success: false, error: 'Email ou mot de passe incorrect.' };
        }

        return {
            success: true,
            user: {
                id: user.id,
                pseudo: user.pseudo,
                email: user.email
            }
        };
    } catch (error: unknown) {
        console.error('Erreur de connexion:', error);
        return { success: false, error: 'Une erreur est survenue lors de la connexion.' };
    }
}