import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

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
				votes: locals.user
					? { where: { userId: locals.user.id } }
					: false
			}
		});

		const suggestionsWithDetails = suggestionsData.map(s => {
			let userVoteStatus: 'LIKE' | 'DISLIKE' | null = null;
			if (locals.user && s.votes && s.votes.length > 0) {
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
				userVote: userVoteStatus,
				description: '',
			};
		});

		return json(suggestionsWithDetails, { status: 200 });

	} catch (error) {
		console.error('Erreur lors de la récupération des suggestions:', error);
		return json({ error: 'Une erreur est survenue lors de la récupération des suggestions.' }, { status: 500 });
	}
};