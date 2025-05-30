<script lang="ts">
    // Définition du type pour un jeu à venir
    type UpcomingGame = {
        id: number;
        name: string;
        imageUrl: string;
        description: string; // Description ou ce à quoi s'attendre
        estimatedReleaseDate?: string; // Date de sortie estimée (optionnelle)
        status: "En développement" | "Bêta à venir" | "Prévu pour bientôt";
        slug: string; // Pour une éventuelle page de détails
    };

    // Données de démonstration pour les jeux à venir
    const upcomingGames: UpcomingGame[] = [
        {
            id: 1,
            name: "Galaxy Voyager",
            imageUrl: "https://placehold.co/600x400/7c3aed/ffffff?text=Galaxy+Voyager", // Violet plus clair pour distinguer
            description: "Explorez des galaxies inconnues et découvrez de nouveaux mondes.",
            estimatedReleaseDate: "Fin 2025",
            status: "En développement",
            slug: "galaxy-voyager",
        },
        {
            id: 2,
            name: "Cyber Glitch",
            imageUrl: "https://placehold.co/600x400/7c3aed/ffffff?text=Cyber+Glitch",
            description: "Un platformer d'action dans un futur cyberpunk dystopique.",
            status: "Bêta à venir",
            slug: "cyber-glitch",
        },
        {
            id: 3,
            name: "Mystic Realms RPG",
            imageUrl: "https://placehold.co/600x400/7c3aed/ffffff?text=Mystic+Realms",
            description: "Plongez dans un RPG fantastique aux quêtes épiques.",
            estimatedReleaseDate: "Début 2026",
            status: "Prévu pour bientôt",
            slug: "mystic-realms-rpg",
        },
        {
            id: 4,
            name: "Arcade Legends Remastered",
            imageUrl: "https://placehold.co/600x400/7c3aed/ffffff?text=Arcade+Legends",
            description: "Les classiques de l'arcade reviennent avec des graphismes modernes.",
            status: "En développement",
            slug: "arcade-legends-remastered",
        },
    ];

    // Fonction pour gérer les erreurs de chargement d'image
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Indisponible';
    }

    function getStatusColor(status: UpcomingGame['status']): string {
        switch (status) {
            case "En développement":
                return "bg-amber-500";
            case "Bêta à venir":
                return "bg-sky-500";
            case "Prévu pour bientôt":
                return "bg-emerald-500";
            default:
                return "bg-gray-500";
        }
    }
</script>

<div class="bg-white min-h-screen max-md:pt-32 p-4 sm:p-8 font-sans">
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold text-[#8128c9]">
            Itis<span class="text-gray-800">Game</span>
        </h1>
        <p class="text-xl text-gray-600 mt-2">Les pépites en préparation, bientôt disponibles !</p>
    </header>

    <main class="px-4 md:px-[100px]">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Prochainement</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each upcomingGames as game, i (game.id)}
                <div
                        class="group bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-purple-400"
                        style="animation-delay: {i * 0.1}s;"
                >
                    <div class="relative">
                        <img
                                src={game.imageUrl}
                                alt={`Image de ${game.name}`}
                                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                on:error={handleImageError}
                        />
                        <div class="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white {getStatusColor(game.status)} rounded-full shadow-md">
                            {game.status}
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <h3 class="text-2xl font-bold">{game.name}</h3>
                            {#if game.estimatedReleaseDate}
                                <p class="text-sm text-purple-200">Sortie estimée : {game.estimatedReleaseDate}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-700 mb-2 group-hover:text-[#8128c9] transition-colors duration-300">{game.name}</h3>
                        <p class="text-gray-600 text-sm mb-4 h-16 overflow-hidden">{game.description}</p>
                        <a
                                href={`/prochainement/${game.slug}`}
                                aria-label={`En savoir plus sur ${game.name}`}
                                class="block w-full text-center bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#8128c9] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#8128c9] focus:ring-opacity-50"
                        >
                            En savoir plus
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </main>
</div>

<style>
    /* Styles globaux et animations similaires à GamesPage.svelte */
    header h1 {
        animation: fadeInDown 0.8s ease-out;
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .grid > div { /* Changé de .grid > a à .grid > div car la carte n'est plus un lien direct */
        animation-name: fadeInUp;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
        opacity: 0;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>