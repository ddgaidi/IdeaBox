<script lang="ts">
	// Import du composant individuel pour chaque suggestion
	import Suggestion from '../Suggestion/Suggestion.svelte';
	import { onMount } from 'svelte';

	// Définir une interface pour une suggestion
	interface Suggestion {
		id: number;
		pseudonyme: string;
		content: string;
		date: string;
		votes: number;
	}

	let suggestions: Suggestion[] = []; // Liste des suggestions récupérées
	let currentPage = 1; // Page actuelle
	const itemsPerPage = 15; // Nombre de suggestions par page (5 lignes x 3 colonnes)
	let totalPages = 1; // Total des pages renvoyé par le backend
	let selectedSuggestion: Suggestion | null = null; // Suggestion actuellement ouverte

	// Fonction pour récupérer les suggestions
	async function fetchSuggestions(page: number = 1) {
		try {
			const response = await fetch(`http://localhost:3000/suggestions?page=${page}&limit=${itemsPerPage}`);
			if (!response.ok) {
				throw new Error('Erreur lors du chargement des suggestions.');
			}
			const data = await response.json();
			suggestions = data.suggestions; // Suggestions récupérées
			totalPages = Math.ceil(data.total / itemsPerPage); // Calcul du nombre total de pages
		} catch (err) {
			if (err instanceof Error) {
				console.error('Erreur :', err.message); // Affiche le message d'erreur
			} else {
				console.error('Erreur inconnue', err);
			}
		}
	}

	// Navigation entre pages
	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return; // Empêche une navigation invalide
		currentPage = page;
		fetchSuggestions(currentPage); // Charger les suggestions de la page
		window.scrollTo({ top: 0, behavior: 'smooth' }); // Revenir au début de la page
	}

	onMount(() => {
		fetchSuggestions(); // Charger les suggestions de la première page au montage
	});
</script>

<section class="relative py-10 pt-28 px-6 md:px-12">
	<h1 class="text-4xl font-bold text-center text-purple-700 mb-6">Explorez les Suggestions</h1>

	<!-- Grille des suggestions -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each suggestions as suggestion (suggestion.id)}
			<div on:click={() => (selectedSuggestion = suggestion)}>
				<Suggestion
					pseudonyme={suggestion.pseudonyme}
					date={new Date(suggestion.date).toLocaleDateString()}
					idee={suggestion.content.length > 100
						? suggestion.content.substring(0, 100) + '...'
						: suggestion.content}
					votes={suggestion.votes}
				/>
			</div>
		{/each}
	</div>

	<!-- Pagination -->
	<div class="flex justify-center mt-8 space-x-4">
		<button
			class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			disabled={currentPage === 1}
			on:click={() => goToPage(currentPage - 1)}
		>
			Précédent
		</button>
		<span class="text-lg font-semibold text-gray-700">Page {currentPage} / {totalPages}</span>
		<button
			class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			disabled={currentPage === totalPages}
			on:click={() => goToPage(currentPage + 1)}
		>
			Suivant
		</button>
	</div>

	<!-- Modale pour afficher une suggestion complète -->
	{#if selectedSuggestion}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white p-6 rounded-lg w-3/4 max-w-xl relative">
				<button
					class="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
					on:click={() => (selectedSuggestion = null)}
				>
					&times;
				</button>
				<h2 class="text-2xl font-bold text-indigo-600 mb-4">{selectedSuggestion.pseudonyme}</h2>
				<p class="text-gray-800 mb-4">{selectedSuggestion.content}</p>
				<footer class="text-gray-500 text-sm">
					Posté le {new Date(selectedSuggestion.date).toLocaleDateString()}
				</footer>
			</div>
		</div>
	{/if}
</section>