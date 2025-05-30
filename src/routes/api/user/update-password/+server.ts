import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcryptjs';

export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await request.json();

        // Vérifier l'utilisateur actuel et son mot de passe
        const user = await prisma.user.findUnique({
            where: { id: locals.user.id }
        });

        if (!user || !await bcrypt.compare(currentPassword, user.password)) {
            return json({ error: 'Mot de passe actuel incorrect' }, { status: 400 });
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe
        await prisma.user.update({
            where: { id: locals.user.id },
            data: { password: hashedPassword }
        });

        return json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        return json({
            error: 'Une erreur est survenue lors de la mise à jour du mot de passe'
        }, { status: 500 });
    }
}