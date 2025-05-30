import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function POST({ request, locals }) {
	if (!locals.user) {
		return json({ error: 'Non autorisé' }, { status: 401 });
	}

	try {
		const { newPseudo } = await request.json();

		const updatedUser = await prisma.user.update({
			where: { id: locals.user.id },
			data: { pseudo: newPseudo }
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