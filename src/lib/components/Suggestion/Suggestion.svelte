<script context="module" lang="ts">
	export type SuggestionType = {
		id: string;
		title: string;
		description: string;
		likes: number;
		dislikes: number;
		userVote?: 'LIKE' | 'DISLIKE' | null;
		text: string;
		authorPseudo: string;
		createdAt: string;
	};
</script>

<script lang="ts">
	import { ThumbsUp, ThumbsDown, User, Calendar } from 'lucide-svelte';
	import { isAuthenticated } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	export let suggestion: SuggestionType;

	let currentLikes = suggestion.likes;
	let currentDislikes = suggestion.dislikes;
	let currentUserVote = suggestion.userVote;
	let isLoadingVote = false;
	let voteError = '';

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	async function handleVote(voteType: 'LIKE' | 'DISLIKE') {
		if (!$isAuthenticated) {
			if (confirm('Vous devez être connecté pour voter. Voulez-vous vous connecter ?')) {
				await goto(`/login?redirectTo=/suggestions`);
			}
			return;
		}
		if (isLoadingVote) return;

		isLoadingVote = true;
		voteError = '';

		const prevLikes = currentLikes;
		const prevDislikes = currentDislikes;
		const prevUserVote = currentUserVote;

		if (currentUserVote === voteType) {
			if (voteType === 'LIKE') currentLikes--;
			else currentDislikes--;
			currentUserVote = null;
		} else {
			if (voteType === 'LIKE') {
				currentLikes++;
				if (currentUserVote === 'DISLIKE') currentDislikes--;
			} else {
				currentDislikes++;
				if (currentUserVote === 'LIKE') currentLikes--;
			}
			currentUserVote = voteType;
		}

		try {
			const response = await fetch(`/api/suggestions/${suggestion.id}/vote`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ voteType })
			});

			const data = await response.json();

			if (!response.ok) {
				voteError = data.error || 'Erreur lors du vote.';
				console.error("Erreur de vote (API):", voteError);
				currentLikes = prevLikes;
				currentDislikes = prevDislikes;
				currentUserVote = prevUserVote;
			} else {
				currentLikes = data.likes;
				currentDislikes = data.dislikes;
			}
		} catch (err) {
			currentLikes = prevLikes;
			currentDislikes = prevDislikes;
			currentUserVote = prevUserVote;
			if (err instanceof Error) {
				voteError = err.message;
			} else {
				voteError = 'Une erreur inconnue est survenue lors du vote.';
			}
			console.error("Erreur de vote (Catch):", err);
		} finally {
			isLoadingVote = false;
		}
	}
</script>

<article transition:slide={{ duration: 300 }} class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
	<div class="p-6 sm:p-8">
		<header class="mb-4">
			<h3 class="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
				{suggestion.title}
			</h3>
			<div class="flex items-center text-xs sm:text-sm text-gray-500 mt-2 space-x-4">
				<span class="flex items-center">
					<User class="h-4 w-4 mr-1.5 text-gray-400" />
					{suggestion.authorPseudo || 'Anonyme'}
				</span>
				<span class="flex items-center">
					<Calendar class="h-4 w-4 mr-1.5 text-gray-400" />
					{formatDate(suggestion.createdAt)}
				</span>
			</div>
		</header>

		<p class="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
			{suggestion.text}
		</p>

		{#if voteError}
			<p class="text-red-500 text-sm mb-3 text-center">{voteError}</p>
		{/if}

		<footer class="flex items-center justify-between pt-4 border-t border-gray-200">
			<div class="flex items-center space-x-3 sm:space-x-4">
				<button
					on:click={() => handleVote('LIKE')}
					class="flex items-center space-x-1.5 cursor-pointer text-gray-500 hover:text-green-500 focus:outline-none transition-colors p-2 rounded-md hover:bg-green-50 disabled:opacity-50"
					title="J'aime"
					disabled={isLoadingVote}
					class:text-green-500={currentUserVote === 'LIKE'}
					class:font-semibold={currentUserVote === 'LIKE'}
				>
					<ThumbsUp size={20} class={currentUserVote === 'LIKE' ? 'fill-current' : ''} />
					<span class="text-sm">{currentLikes}</span>
				</button>

				<button
					on:click={() => handleVote('DISLIKE')}
					class="flex items-center space-x-1.5 cursor-pointer text-gray-500 hover:text-red-500 focus:outline-none transition-colors p-2 rounded-md hover:bg-red-50 disabled:opacity-50"
					title="Je n'aime pas"
					disabled={isLoadingVote}
					class:text-red-500={currentUserVote === 'DISLIKE'}
					class:font-semibold={currentUserVote === 'DISLIKE'}
				>
					<ThumbsDown size={20} class={currentUserVote === 'DISLIKE' ? 'fill-current' : ''} />
					<span class="text-sm">{currentDislikes}</span>
				</button>
			</div>
		</footer>
	</div>
</article>