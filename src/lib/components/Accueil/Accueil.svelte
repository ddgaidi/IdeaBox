<script lang="ts">
	import { ArrowRight, UserPlus, Lightbulb, MessageSquare, Award } from 'lucide-svelte';
	import SuggestionCard from '$lib/components/Suggestion/Suggestion.svelte';
	import type { SuggestionType } from '$lib/components/Suggestion/Suggestion.svelte';

	// Données pour les fonctionnalités (inchangées)
	const features = [
		{
			icon: Lightbulb,
			title: 'Proposez Vos Idées',
			description: 'Partagez facilement vos suggestions pour améliorer notre communauté et nos services.',
			color: 'text-yellow-500'
		},
		{
			icon: MessageSquare,
			title: 'Votez',
			description: 'Donnez votre avis sur les propositions des autres en votant pour ou contre.',
			color: 'text-blue-500'
		},
		{
			icon: Award,
			title: 'Voyez l\'Impact',
			description: 'Suivez l\'évolution des suggestions populaires et voyez comment elles prennent forme.',
			color: 'text-green-500'
		}
	];

	// Fausses suggestions pour l'animation (inchangées)
	const fakeSuggestions: SuggestionType[] = [
		{
			id: 'fake1',
			title: 'Fontaine à chocolat au bureau',
			description: 'Une délicieuse idée pour booster le moral des troupes chocolatées.',
			text: 'Pour améliorer le moral des troupes et apporter une touche de gourmandise au quotidien, l\'installation d\'une fontaine à chocolat en libre-service serait une initiative très appréciée. Accompagnée de fruits frais et de marshmallows, bien sûr !',
			likes: 123,
			dislikes: 2,
			authorPseudo: 'Gourmand Anonyme',
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
			userVote: null
		},
		{
			id: 'fake2',
			title: 'Toboggan pour descendre les étages',
			description: 'Un moyen de transport interne fun et rapide.',
			text: 'Et si on remplaçait l\'ennuyeux ascenseur par un toboggan géant ? Plus rapide, plus écologique (pas d\'électricité !) et tellement plus amusant pour se rendre aux réunions ou à la cafétéria.',
			likes: 256,
			dislikes: 5,
			authorPseudo: 'Speedy Gonzales Jr.',
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
			userVote: null
		},
		{
			id: 'fake3',
			title: 'Siestes énergétiques obligatoires',
			description: 'Améliorer la productivité grâce au repos.',
			text: 'Instaurer une pause sieste de 20 minutes après le déjeuner pourrait grandement améliorer la productivité et la concentration de tous. Des espaces dédiés et confortables seraient à prévoir.',
			likes: 301,
			dislikes: 1,
			authorPseudo: 'Dormeur Professionnel',
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
			userVote: null
		},
		{
			id: 'fake4',
			title: 'Un lama comme mascotte officielle',
			description: 'Pour une ambiance plus décontractée et originale.',
			text: 'Adopter un lama (ou plusieurs !) comme mascotte de l\'entreprise. Ils pourraient se promener librement dans les open-spaces (ou des enclos dédiés) pour apporter une dose de nature et de fun.',
			likes: 189,
			dislikes: 3,
			authorPseudo: 'Fan de Camélidés',
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
			userVote: null
		},
		{
			id: 'fake5',
			title: 'Musique d\'ambiance thématique',
			description: 'Des playlists pour chaque moment de la journée.',
			text: 'Proposer des playlists musicales thématiques (concentration, créativité, détente) diffusées discrètement dans les espaces communs pour améliorer l\'atmosphère de travail.',
			likes: 99,
			dislikes: 8,
			authorPseudo: 'DJ Occasionnel',
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
			userVote: null
		},
		{
			id: 'fake6',
			title: 'Challenge "Vendredi Déguisé"',
			description: 'Un thème de déguisement chaque semaine.',
			text: 'Organiser un "Vendredi Déguisé" hebdomadaire avec des thèmes variés (super-héros, personnages historiques, années 80...) pour stimuler la créativité et renforcer la cohésion d\'équipe.',
			likes: 150,
			dislikes: 4,
			authorPseudo: 'Fêtard Incognito',
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
			userVote: null
		},
	];

	// Pour un défilement vraiment infini, nous avons besoin de deux copies des suggestions.
	// L'animation déplacera tout le conteneur de la largeur d'UNE copie.
	// Donc, le conteneur interne doit avoir une largeur de 200% par rapport à la largeur des suggestions visibles.
	const marqueeSuggestions = [...fakeSuggestions, ...fakeSuggestions.map(s => ({ ...s, id: `${s.id}-clone` }))];

</script>

<style lang="postcss">
    .marquee-container {
        overflow: hidden;
        width: 100%;
        display: flex; /* Important pour que l'animation de défilement fonctionne correctement */
    }

    .marquee-content {
        display: flex; /* Aligne les cartes horizontalement */
        flex-shrink: 0; /* Empêche le rétrécissement du contenu */
        /* La largeur totale sera la somme des largeurs des enfants.
					 L'animation déplacera ce conteneur. */
        animation: marquee-scroll 20s linear infinite; /* Ajustez la durée pour la vitesse */
    }

    @keyframes marquee-scroll {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-50%); /* Défile de la largeur du premier ensemble de suggestions */
        }
    }

    .marquee-item {
        flex: 0 0 auto; /* Empêche le rétrécissement/agrandissement des cartes */
        width: 320px;   /* Largeur fixe pour chaque carte */
        margin-right: 1.5rem; /* Espace entre les cartes (équivalent à mr-6 de Tailwind) */
        /* Pour désactiver les clics sur les boutons de vote DANS les cartes de ce marquee */
    }
    .marquee-item :global(article footer button) { /* Cible les boutons de vote dans les SuggestionCard */
        pointer-events: none !important; /* Désactive les clics et autres événements pointeur */
        cursor: default !important; /* Change le curseur pour indiquer la non-interactivité */
    }


    @media (min-width: 768px) { /* md breakpoint */
        .marquee-item {
            width: 384px; /* w-96 de Tailwind */
        }
    }

    /* Optionnel: pour rendre la carte entière non cliquable dans le marquee */
    /*
		.marquee-item :global(article) {
			pointer-events: none;
			cursor: default;
		}
		*/
</style>

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

<!-- Section des fausses suggestions animées -->
<section class="py-16 sm:py-24 bg-white">
	<div class="max-w-full mx-auto">
		<div class="flex flex-col sm:flex-row justify-between items-center mb-12 px-6 md:px-32">
		<h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
		Quelques Idées Inspirantes...
		</h2>
		<a href="/suggestions" class="text-indigo-600 hover:text-indigo-800 font-semibold group flex items-center shrink-0">
		Voir toutes les suggestions
		<ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-150" />
		</a>
		</div>

		<div class="marquee-container py-4">
		<div class="marquee-content">
		{#each marqueeSuggestions as suggestion (suggestion.id)}
		<div class="marquee-item">
		<SuggestionCard {suggestion} />
		</div>
		{/each}
		</div>
		</div>
		</div>
		</section>

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