import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { VoteType } from '@prisma/client';

export const POST: RequestHandler = async ({ request, locals, params }) => {
	if (!locals.user) {
		return json({ error: 'Non autorisé. Vous devez être connecté pour voter.' }, { status: 401 });
	}

	const { suggestionId } = params;
	if (!suggestionId) {
		return json({ error: 'ID de suggestion manquant.' }, { status: 400 });
	}

	try {
		const { voteType } : { voteType: 'LIKE' | 'DISLIKE' } = await request.json();

		if (voteType !== VoteType.LIKE && voteType !== VoteType.DISLIKE) {
			return json({ error: 'Type de vote invalide.' }, { status: 400 });
		}

		const userId = locals.user.id;

		// Vérifier si la suggestion existe
		const suggestion = await prisma.suggestion.findUnique({
			where: { id: suggestionId }
		});

		if (!suggestion) {
			return json({ error: 'Suggestion non trouvée.' }, { status: 404 });
		}

		const existingVote = await prisma.vote.findUnique({
			where: {
				userId_suggestionId: {
					userId,
					suggestionId
				}
			}
		});

		await prisma.$transaction(async (tx) => {
			if (existingVote) {
				// L'utilisateur a déjà voté
				if (existingVote.type === voteType) {
					// L'utilisateur clique sur le même vote : on annule le vote
					await tx.vote.delete({
						where: { userId_suggestionId: { userId, suggestionId } }
					});
					await tx.suggestion.update({
						where: { id: suggestionId },
						data: {
							[voteType === VoteType.LIKE ? 'likes' : 'dislikes']: { decrement: 1 }
						}
					});
				} else {
					// L'utilisateur change son vote
					await tx.vote.update({
						where: { userId_suggestionId: { userId, suggestionId } },
						data: { type: voteType }
					});
					await tx.suggestion.update({
						where: { id: suggestionId },
						data: {
							[voteType === VoteType.LIKE ? 'likes' : 'dislikes']: { increment: 1 },
							[voteType === VoteType.LIKE ? 'dislikes' : 'likes']: { decrement: 1 }
						}
					});
				}
			} else {
				// Nouveau vote
				await tx.vote.create({
					data: {
						userId,
						suggestionId,
						type: voteType
					}
				});
				await tx.suggestion.update({
					where: { id: suggestionId },
					data: {
						[voteType === VoteType.LIKE ? 'likes' : 'dislikes']: { increment: 1 }
					}
				});
			}
		});

		// Récupérer la suggestion mise à jour pour renvoyer les compteurs
		const updatedSuggestion = await prisma.suggestion.findUnique({
			where: { id: suggestionId },
			select: { likes: true, dislikes: true }
		});

		return json({ success: true, likes: updatedSuggestion?.likes, dislikes: updatedSuggestion?.dislikes }, { status: 200 });

	} catch (error) {
		console.error('Erreur lors du vote sur la suggestion:', error);
		// @ts-ignore
		if (error.code === 'P2003') { // Foreign key constraint failed (e.g. suggestionId doesn't exist)
			return json({ error: 'La suggestion référencée n\'existe pas.' }, { status: 404 });
		}
		return json({ error: 'Une erreur est survenue lors du vote.' }, { status: 500 });
	}
};