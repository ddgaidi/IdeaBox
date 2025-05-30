<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, UserPlus, Lightbulb, MessageSquare, Award, Loader2, AlertTriangle } from 'lucide-svelte';
	import SuggestionCard from '$lib/components/Suggestion/Suggestion.svelte'; // Importer le composant de carte
	import type { SuggestionType } from '$lib/components/Suggestion/Suggestion.svelte'; // Importer le type

	let latestSuggestions: SuggestionType[] = [];
	let isLoading = true;
	let errorMessage = '';

	// Données pour les fonctionnalités (peut rester statique ou être dynamisé plus tard)
	const features = [
		{
			icon: Lightbulb,
			title: 'Proposez Vos Idées',
			description: 'Partagez facilement vos suggestions pour améliorer notre communauté et nos services.',
			color: 'text-yellow-500'
		},
		{
			icon: MessageSquare,
			title: 'Votez & Commentez',
			description: 'Donnez votre avis sur les propositions des autres et participez à la discussion.',
			color: 'text-blue-500'
		},
		{
			icon: Award,
			title: 'Voyez l\'Impact',
			description: 'Suivez l\'évolution des suggestions populaires et voyez comment elles prennent forme.',
			color: 'text-green-500'
		}
	];

	onMount(async () => {
		isLoading = true;
		errorMessage = '';
		try {
			const response = await fetch('/api/suggestions?limit=8');
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Impossible de charger les dernières suggestions.');
			}
			const data: SuggestionType[] = await response.json();
			latestSuggestions = data;
		} catch (err) {
			if (err instanceof Error) {
				errorMessage = err.message;
			} else {
				errorMessage = 'Une erreur inconnue est survenue.';
			}
			console.error('Erreur lors de la récupération des dernières suggestions:', err);
		} finally {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Accueil - Plateforme de Suggestions</title>
	<meta name="description" content="Bienvenue sur notre plateforme collaborative de suggestions. Proposez, votez et discutez des idées pour améliorer notre communauté." />
</svelte:head>

<!-- Section Héros -->
<section class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 sm:py-32 px-6 md:px-12 text-center">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
			Façonnons l'Avenir, <span class="block sm:inline">Ensemble.</span>
		</h1>
		<p class="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
			Votre voix compte. Proposez vos idées, votez pour celles qui vous inspirent et contribuez à construire une meilleure expérience pour tous.
		</p>
		<div class="space-y-4 sm:space-y-0 sm:space-x-4">
			<a href="/poster-suggestion" class="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-50 transition-transform transform hover:scale-105 duration-150 ease-in-out inline-block">
				Proposer une Idée
			</a>
			<a href="/suggestions" class="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg shadow-sm hover:bg-white hover:text-indigo-600 transition-colors duration-150 ease-in-out inline-block">
				Voir les Suggestions
			</a>
		</div>
	</div>
</section>

<!-- Section Fonctionnalités -->
<section class="py-16 sm:py-24 bg-gray-50">
	<div class="max-w-6xl mx-auto px-6 md:px-12">
		<h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">Comment ça marche ?</h2>
		<p class="text-center text-gray-600 text-lg mb-12 sm:mb-16 max-w-2xl mx-auto">
			Notre plateforme est conçue pour être simple, transparente et collaborative.
		</p>
		<div class="grid md:grid-cols-3 gap-8 sm:gap-12">
			{#each features as feature}
				<div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
					<div class={`w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 ${feature.color}`}>
						<svelte:component this={feature.icon} size={32} />
					</div>
					<h3 class="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
					<p class="text-gray-600 leading-relaxed">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Section Dernières Suggestions -->
<section class="py-16 sm:py-24 bg-white">
	<div class="max-w-6xl mx-auto px-6 md:px-12">
		<div class="flex flex-col sm:flex-row justify-between items-center mb-12">
			<h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
				Dernières Suggestions
			</h2>
			<a href="/suggestions" class="text-indigo-600 hover:text-indigo-800 font-semibold group flex items-center">
				Voir toutes les suggestions
				<ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-150" />
			</a>
		</div>

		{#if isLoading}
			<div class="flex flex-col items-center justify-center text-center py-10">
				<Loader2 class="h-12 w-12 text-blue-500 animate-spin mb-4" />
				<p class="text-lg text-gray-500">Chargement des suggestions...</p>
			</div>
		{:else if errorMessage}
			<div class="bg-red-50 border-l-4 border-red-400 text-red-700 p-6 rounded-md shadow-md flex items-center">
				<AlertTriangle class="h-6 w-6 text-red-500 mr-3 shrink-0" />
				<div>
					<p class="font-semibold">Erreur de chargement</p>
					<p>{errorMessage}</p>
				</div>
			</div>
		{:else if latestSuggestions.length === 0}
			<div class="text-center py-10">
				<MessageSquare class="h-16 w-16 text-gray-400 mx-auto mb-4" />
				<p class="text-xl text-gray-500">Aucune suggestion pour le moment.</p>
				<p class="text-gray-400 mt-2">Soyez le premier à proposer une idée !</p>
				<a href="/poster-suggestion" class="mt-6 inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
					Proposer une Suggestion
				</a>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
				{#each latestSuggestions as suggestion (suggestion.id)}
					<SuggestionCard {suggestion} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Section Appel à l'action (Inscription) -->
<section class="py-16 sm:py-24 bg-gray-50">
	<div class="max-w-4xl mx-auto px-6 md:px-12 text-center">
		<UserPlus class="h-16 w-16 text-indigo-500 mx-auto mb-6" />
		<h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
			Prêt à faire entendre votre voix ?
		</h2>
		<p class="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
			Rejoignez notre communauté dès aujourd'hui pour commencer à proposer vos idées, voter et participer aux discussions.
		</p>
		<a href="/register" class="bg-indigo-600 text-white font-semibold px-10 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-150 ease-in-out text-lg">
			S'inscrire Maintenant
		</a>
	</div>
</section>