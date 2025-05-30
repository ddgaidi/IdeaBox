import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Non autorisé. Vous devez être connecté pour poster une suggestion.' }, { status: 401 });
	}

	try {
		const { title, text } = await request.json();

		if (!title || title.trim() === '' || !text || text.trim() === '') {
			return json({ error: 'Le titre et le texte de la suggestion ne peuvent pas être vides.' }, { status: 400 });
		}

		const suggestion = await prisma.suggestion.create({
			data: {
				title,
				text,
				authorId: locals.user.id,
				// Le pseudonyme de l'auteur sera récupéré via la relation lors de l'affichage
			}
		});

		return json({ success: true, suggestion }, { status: 201 });

	} catch (error) {
		console.error('Erreur lors de la création de la suggestion:', error);
		return json({ error: 'Une erreur est survenue lors de la création de la suggestion.' }, { status: 500 });
	}
};