<script lang="ts">
	import { onMount } from 'svelte';
	import { MessageSquare, AlertTriangle, Loader2 } from 'lucide-svelte';
	import SuggestionCard from '$lib/components/Suggestion/Suggestion.svelte';
	import type { SuggestionType } from '$lib/components/Suggestion/Suggestion.svelte';

	let suggestions: SuggestionType[] = [];
	let isLoading = true;
	let errorMessage = '';

	onMount(async () => {
		await fetchSuggestions();
	});

	async function fetchSuggestions() {
		isLoading = true;
		errorMessage = '';
		try {
			const response = await fetch('/api/suggestions');
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Impossible de charger les suggestions.');
			}
			const data: SuggestionType[] = await response.json();
			suggestions = data.map(s => ({ ...s, userVote: s.userVote || undefined }));
		} catch (err) {
			if (err instanceof Error) {
				errorMessage = err.message;
			} else {
				errorMessage = 'Une erreur inconnue est survenue.';
			}
			console.error('Erreur lors de la récupération des suggestions:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		<header class="mb-10 text-center">
			<h1 class="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 drop-shadow-sm leading-normal -ml-6"> <MessageSquare class="inline-block mr-2 -mt-1 h-8 w-8 sm:h-10 sm:w-10" />Suggestions
			</h1>
			<p class="text-lg text-gray-600">Découvrez les idées proposées par la communauté.</p>
		</header>

		{#if isLoading}
			<div class="flex flex-col items-center justify-center text-center py-10">
				<Loader2 class="h-12 w-12 text-blue-500 animate-spin mb-4" />
				<p class="text-lg text-gray-500">Chargement des suggestions...</p>
			</div>
		{:else if errorMessage}
			<div
				class="bg-red-50 border-l-4 border-red-400 text-red-700 p-6 rounded-md shadow-md relative text-left"
				role="alert"
			>
				<div class="flex">
					<div class="py-1"><AlertTriangle class="h-6 w-6 text-red-500 mr-3" /></div>
					<div>
						<p class="font-bold mb-1">Erreur lors du chargement</p>
						<p class="text-sm"> {errorMessage}</p>
						<button
							class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-150"
							on:click={fetchSuggestions}>Réessayer</button
						>
					</div>
				</div>
			</div>
		{:else if suggestions.length === 0}
			<div class="text-center py-10 bg-white rounded-xl shadow-lg p-8">
				<MessageSquare class="h-16 w-16 text-gray-400 mx-auto mb-4" />
				<p class="text-xl text-gray-600 mb-2">Aucune suggestion pour le moment.</p>
				<p class="text-gray-500">
					Soyez le premier à en <a
					href="/poster-suggestion"
					class="text-blue-500 hover:text-blue-600 hover:underline font-medium">poster une</a
				> !
				</p>
			</div>
		{:else}
			<div class="space-y-6">
				{#each suggestions as suggestion (suggestion.id)}
					<SuggestionCard {suggestion} />
				{/each}
			</div>
		{/if}
	</div>
</div>