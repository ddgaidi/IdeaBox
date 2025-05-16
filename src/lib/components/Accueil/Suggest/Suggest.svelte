<script>
	import Suggestion from '$lib/components/Suggestion/Suggestion.svelte';

	// Simulation des données pour les 10 suggestions
	let suggestions = [
		{ pseudonyme: 'Alice', date: '2023-11-01', idee: 'Créer une fonctionnalité de filtre avancé.', votes: 124 },
		{ pseudonyme: 'Bob', date: '2023-11-02', idee: 'Ajouter un système de notification en temps réel.', votes: 102 },
		{ pseudonyme: 'Charlie', date: '2023-11-03', idee: 'Optimiser les performances du site pour mobile.', votes: 88 },
		{ pseudonyme: 'Diane', date: '2023-11-04', idee: 'Mettre en place un mode sombre.', votes: 76 },
		{ pseudonyme: 'Emma', date: '2023-11-05', idee: 'Proposer des tutoriels interactifs.', votes: 68 },
		{ pseudonyme: 'Fred', date: '2023-11-06', idee: 'Créer un tableau de bord pour les statistiques des idées.', votes: 55 },
		{ pseudonyme: 'George', date: '2023-11-07', idee: 'Ajouter des avatars personnalisables.', votes: 43 },
		{ pseudonyme: 'Hannah', date: '2023-11-08', idee: 'Intégrer l\'authentification via Google et Facebook.', votes: 40 },
		{ pseudonyme: 'Isla', date: '2023-11-09', idee: 'Permettre de marquer des idées comme "favoris".', votes: 36 },
		{ pseudonyme: 'Jack', date: '2023-11-10', idee: 'Ajouter un système de badge pour les contributeurs actifs.', votes: 30 }
	];
</script>

<section class="relative text-white pb-12">
	<div class="container mx-auto">
		<h2 class="text-3xl font-extrabold text-center text-white mb-8">
			{#if suggestions.length > 0}
				Les idées les plus populaires
			{:else}
				Aucune suggestion pour l'instant
			{/if}
		</h2>

		<!-- Carousel -->
		<div class="overflow-hidden relative">
			<div class="carousel">
				<!-- Duplique les suggestions pour un défilement infini -->
				{#each [...suggestions, ...suggestions] as suggestion, index (index)}
					<Suggestion
						pseudonyme={suggestion.pseudonyme}
						date={suggestion.date}
						idee={suggestion.idee}
						votes={suggestion.votes}
					/>
				{/each}
			</div>
		</div>

		<!-- Bouton "Voir plus" -->
		<div class="text-center mt-8">
			<a
				href="/suggestions"
				class="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow hover:bg-indigo-100 transition"
			>
				Voir plus
			</a>
		</div>
	</div>
</section>

<style>
    .overflow-hidden {
        max-width: 100%;
        overflow: hidden;
    }

    .carousel {
        display: flex;
        white-space: nowrap;
        align-items: center;
        gap: 1.5rem;
        /* Animation du défilement infini */
        animation: scroll-infinite 20s linear infinite;
    }

    /* Animation de défilement continu */
    @keyframes scroll-infinite {
        from {
            transform: translateX(0%); /* Départ */
        }
        to {
            transform: translateX(-100%); /* Fin */
        }
    }

    /* Les cartes de suggestions doivent garder une taille fixe */
    .Suggestion {
        flex: 0 0 auto; /* Empêche les cartes de changer de taille */
        width: 16rem; /* Largeur fixe de chaque suggestion */
    }
</style>