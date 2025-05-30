<script lang="ts">
    import { onMount } from 'svelte';
    import { ArrowRight, UserPlus, Lightbulb, MessageSquare, Award } from 'lucide-svelte';

    // Simuler des données de suggestions pour le défilement infini
    const suggestions = [
        { id: 1, title: "Améliorer la recherche de suggestions", votes: 120, author: "Alice" },
        { id: 2, title: "Ajouter une option de thème sombre", votes: 95, author: "Bob" },
        { id: 3, title: "Intégrer un système de notifications", votes: 88, author: "Charlie" },
        { id: 4, title: "Optimiser les performances mobiles", votes: 72, author: "David" },
        { id: 5, title: "Proposer des catégories de suggestions", votes: 65, author: "Eve" },
        { id: 6, title: "Ajouter un bouton 'Partager' pour les suggestions", votes: 50, author: "Frank" },
        { id: 7, title: "Permettre l'édition des suggestions postées", votes: 45, author: "Grace" },
        { id: 8, title: "Mettre en place un système de badges pour les contributeurs", votes: 40, author: "Heidi" },
    ];

    // Dupliquer les suggestions pour assurer un défilement infini fluide
    const infiniteSuggestions = [...suggestions, ...suggestions, ...suggestions];

    let showHero = false;
    let showPublishSection = false;
    let showSuggestionsSection = false;

    onMount(() => {
        // Animer l'apparition des sections au chargement de la page
        setTimeout(() => { showHero = true; }, 100);
        setTimeout(() => { showPublishSection = true; }, 500);
        setTimeout(() => { showSuggestionsSection = true; }, 900);
    });
</script>

<div class="min-h-screen bg-gray-50 font-sans text-gray-800">

    <section
      class="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8
           overflow-hidden transition-all duration-1000 ease-out"
      class:opacity-0={!showHero}
      class:translate-y-10={!showHero}
      class:opacity-100={showHero}
      class:translate-y-0={showHero}
    >
        <div class="absolute inset-0 z-0 opacity-20">
            <svg class="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor"></circle>
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
        </div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                Votre Voix Compte. Partagez Vos Idées.
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
                Bienvenue sur notre plateforme collaborative où chaque suggestion peut façonner l'avenir. Exprimez-vous, votez pour les meilleures idées et aidez-nous à construire une meilleure expérience ensemble.
            </p>
            <a
              href="#suggestions"
              class="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-full
               shadow-xl hover:bg-blue-100 hover:text-blue-800 transition duration-300 ease-in-out
               transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                Explorer les Suggestions
                <ArrowRight class="ml-3 h-6 w-6" />
            </a>
        </div>
    </section>

    <section
      class="py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ease-out delay-200"
      class:opacity-0={!showPublishSection}
      class:translate-y-10={!showPublishSection}
      class:opacity-100={showPublishSection}
      class:translate-y-0={showPublishSection}
    >
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-extrabold text-center text-blue-700 mb-12">
                Comment Publier Votre Suggestion
            </h2>
            <div class="grid md:grid-cols-3 gap-10">
                <div
                  class="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out
                 transform hover:-translate-y-2 flex flex-col items-center text-center"
                >
                    <div class="bg-blue-200 p-4 rounded-full mb-6 transform rotate-0 hover:rotate-12 transition-transform duration-300">
                        <UserPlus class="h-10 w-10 text-blue-700" />
                    </div>
                    <h3 class="text-2xl font-bold text-blue-600 mb-4">1. Créez ou Connectez-vous</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Pour garantir une communauté authentique, vous devez avoir un compte.
                        <a href="#register" class="text-blue-500 hover:underline font-semibold">Inscrivez-vous</a>
                        ou
                        <a href="#login" class="text-blue-500 hover:underline font-semibold">connectez-vous</a>
                        si vous avez déjà un compte.
                    </p>
                </div>

                <div
                  class="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out
                 transform hover:-translate-y-2 flex flex-col items-center text-center"
                >
                    <div class="bg-blue-200 p-4 rounded-full mb-6 transform rotate-0 hover:rotate-12 transition-transform duration-300">
                        <Lightbulb class="h-10 w-10 text-blue-700" />
                    </div>
                    <h3 class="text-2xl font-bold text-blue-600 mb-4">2. Rédigez Votre Idée</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Une fois connecté, naviguez vers la section "Poster une Suggestion". Décrivez votre idée clairement et concrètement. Plus c'est détaillé, mieux c'est !
                    </p>
                </div>

                <div
                  class="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out
                 transform hover:-translate-y-2 flex flex-col items-center text-center"
                >
                    <div class="bg-blue-200 p-4 rounded-full mb-6 transform rotate-0 hover:rotate-12 transition-transform duration-300">
                        <Award class="h-10 w-10 text-blue-700" />
                    </div>
                    <h3 class="text-2xl font-bold text-blue-600 mb-4">3. Soumettez et Votez</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Après soumission, votre suggestion sera visible par la communauté. Vous pouvez alors voter pour d'autres idées et voir comment la vôtre progresse !
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section
      class="py-20 px-0 bg-gray-100 overflow-hidden transition-all duration-1000 ease-out delay-400"
      class:opacity-0={!showSuggestionsSection}
      class:translate-y-10={!showSuggestionsSection}
      class:opacity-100={showSuggestionsSection}
      class:translate-y-0={showSuggestionsSection}
    >
        <h2 class="text-4xl font-extrabold text-center text-blue-700 mb-12">
            Les Dernières Suggestions
        </h2>
        <div class="relative w-full overflow-hidden">
            <div class="flex animate-scroll-x whitespace-nowrap py-4">
                {#each infiniteSuggestions as suggestion (suggestion.id)}
                    <div
                      class="inline-block w-80 flex-shrink-0 mx-4 p-6 bg-white rounded-xl shadow-md border border-blue-100
                   transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                        <h3 class="text-lg font-semibold text-blue-800 truncate mb-2">{suggestion.title}</h3>
                        <p class="text-sm text-gray-600 mb-3">Par {suggestion.author}</p>
                        <div class="flex items-center text-blue-600 font-bold">
                            <MessageSquare class="h-5 w-5 mr-2" /> {suggestion.votes} Votes
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>
</div>

<style lang="postcss">
    /* Définition de l'animation de défilement infini */
    @keyframes scroll-x {
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(-50%); /* Défile la moitié des éléments pour un loop parfait */
        }
    }

    .animate-scroll-x {
        animation: scroll-x 40s linear infinite; /* 40s pour la durée, ajustez selon la vitesse désirée */
        /* Pour que l'animation se mette en pause au survol */
        &:hover {
            animation-play-state: paused;
        }
    }

    /* Styles pour la police Inter si non définie globalement */
    :global(body) {
        font-family: 'Inter', sans-serif;
    }
</style>