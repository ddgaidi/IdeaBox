import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import type { VoteType } from '@prisma/client';

export const GET: RequestHandler = async ({ url, locals }) => {
	try {
		const limitParam = url.searchParams.get('limit');
		const limit = limitParam ? parseInt(limitParam, 10) : undefined;

		if (limitParam && (isNaN(limit as number) || (limit as number) <= 0)) {
			return json({ error: 'Le paramètre "limit" doit être un nombre positif.' }, { status: 400 });
		}

		const suggestionsData = await prisma.suggestion.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			take: limit,
			include: {
				author: {
					select: { pseudo: true }
				},
				votes: locals.user // On inclut les votes de l'utilisateur uniquement s'il est connecté
					? { where: { userId: locals.user.id } }
					: false // Ne pas inclure les votes si l'utilisateur n'est pas connecté
			}
		});

		const suggestionsWithDetails = suggestionsData.map(s => {
			let userVoteStatus: 'LIKE' | 'DISLIKE' | null = null;
			if (locals.user && s.votes && s.votes.length > 0) {
				// S'il y a un vote par cet utilisateur pour cette suggestion
				// Note: s.votes sera un tableau, prenez le premier élément s'il existe
				userVoteStatus = s.votes[0].type as 'LIKE' | 'DISLIKE';
			}

			return {
				id: s.id,
				title: s.title,
				text: s.text,
				createdAt: s.createdAt.toISOString(),
				authorPseudo: s.author.pseudo,
				likes: s.likes,
				dislikes: s.dislikes,
				userVote: userVoteStatus, // Sera null si non connecté ou pas de vote
				description: '', // Pour la flexibilité future
				// Retirer s.votes du retour final si ce n'est pas nécessaire côté client directement
				// et que seul userVoteStatus est utile.
			};
		});

		return json(suggestionsWithDetails, { status: 200 });

	} catch (error) {
		console.error('Erreur lors de la récupération des suggestions:', error);
		return json({ error: 'Une erreur est survenue lors de la récupération des suggestions.' }, { status: 500 });
	}
};