<script lang="ts">
	import { onMount } from 'svelte';
	import { MessageSquare, AlertTriangle, Loader2, UserLock } from 'lucide-svelte'; // Ajout de UserLock
	import SuggestionCard from '$lib/components/Suggestion/Suggestion.svelte';
	import type { SuggestionType } from '$lib/components/Suggestion/Suggestion.svelte';
	import { isAuthenticated } from '$lib/stores/auth'; // Import du store d'authentification
	import { goto } from '$app/navigation'; // Import pour la redirection

	let suggestions: SuggestionType[] = [];
	let isLoading = true;
	let errorMessage = '';
	let showLoginPrompt = false; // État pour afficher l'invite de connexion

	onMount(async () => {
		// Vérifier l'authentification avant de fetcher
		if (!$isAuthenticated) {
			showLoginPrompt = true;
			isLoading = false; // Arrêter le chargement car nous n'allons pas fetcher
			return;
		}
		await fetchSuggestions();
	});

	async function fetchSuggestions() {
		// Si l'utilisateur n'est pas authentifié (vérification supplémentaire au cas où)
		if (!$isAuthenticated) {
			showLoginPrompt = true;
			isLoading = false;
			return;
		}

		isLoading = true;
		errorMessage = '';
		showLoginPrompt = false; // S'assurer que l'invite de connexion est cachée si on re-fetch après connexion

		try {
			const response = await fetch('/api/suggestions');

			// Si la réponse n'est pas OK, et que c'est un statut qui pourrait indiquer une redirection (ex: 401 Unauthorized)
			// cela peut aussi être géré ici, mais l'API devrait idéalement retourner un JSON d'erreur clair.
			if (!response.ok) {
				// Tentative de lecture du message d'erreur JSON, sinon erreur générique
				try {
					const errorData = await response.json();
					throw new Error(errorData.error || `Erreur ${response.status}: Impossible de charger les suggestions.`);
				} catch (jsonParseError) {
					// Si la réponse n'est pas du JSON (par exemple, une page HTML de redirection)
					if (response.status === 401 || response.status === 403) {
						showLoginPrompt = true;
						isLoading = false;
						return; // Ne pas continuer si c'est un problème d'auth
					}
					throw new Error(`Erreur ${response.status}: Le serveur a renvoyé une réponse inattendue.`);
				}
			}
			const data: SuggestionType[] = await response.json();
			suggestions = data.map(s => ({ ...s, userVote: s.userVote || undefined }));
		} catch (err) {
			if (err instanceof Error) {
				// Si l'erreur est spécifiquement parce que l'utilisateur doit se connecter (détecté par le message ou statut)
				// on pourrait vouloir afficher le showLoginPrompt ici aussi.
				// Pour l'instant, on affiche le message d'erreur général.
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
		{:else if showLoginPrompt}
			<div class="text-center p-8 bg-white rounded-xl shadow-xl my-10">
				<UserLock class="h-16 w-16 text-blue-500 mx-auto mb-6" />
				<h2 class="text-2xl font-semibold text-gray-700 mb-3">Accès Réservé</h2>
				<p class="text-gray-600 mb-8">
					Vous devez être connecté pour consulter les suggestions.
				</p>
				<button
					on:click={() => goto('/login?redirectTo=/suggestions')}
					class="bg-blue-500 cursor-pointer transition-all duration-300 transform hover:scale-105 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
				>
					Se connecter
				</button>
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
						{#if $isAuthenticated}
							<button
								class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-150"
								on:click={fetchSuggestions}>Réessayer
							</button>
						{:else}
							<button
								class="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-150"
								on:click={() => goto('/login?redirectTo=/suggestions')}>Se connecter pour réessayer
							</button>
						{/if}
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