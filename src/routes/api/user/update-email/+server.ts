import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcryptjs';

export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const { newEmail, currentPassword } = await request.json();

        const user = await prisma.user.findUnique({
            where: { id: locals.user.id }
        });

        if (!user || !await bcrypt.compare(currentPassword, user.password)) {
            return json({ error: 'Mot de passe incorrect' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: locals.user.id },
            data: { email: newEmail }
        });

        return json({
            user: {
                id: updatedUser.id,
                pseudo: updatedUser.pseudo,
                email: updatedUser.email
            }
        });
    } catch (error) {
        return json({ error: 'Une erreur est survenue lors de la mise à jour' }, { status: 500 });
    }
}