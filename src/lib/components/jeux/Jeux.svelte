<script lang="ts">
    // Définition du type pour un jeu
    type Game = {
        id: number;
        name: string;
        imageUrl: string;
        description: string; // Petite description ou slogan du jeu
        slug: string; // Pour la navigation vers la page du jeu
    };

    // Données de démonstration pour les jeux
    // Remplacez-les par vos propres données de jeu
    const games: Game[] = [
        {
            id: 1,
            name: "Space Shooter X",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Space+Shooter+X",
            description: "Détruisez les envahisseurs de l'espace !",
            slug: "space-shooter-x",
        },
        {
            id: 2,
            name: "Pixel Runner",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Pixel+Runner",
            description: "Courez et sautez dans un monde pixelisé.",
            slug: "pixel-runner",
        },
        {
            id: 3,
            name: "Tower Defense Pro",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Tower+Defense",
            description: "Protégez votre base contre les vagues ennemies.",
            slug: "tower-defense-pro",
        },
        {
            id: 4,
            name: "Retro Racer",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Retro+Racer",
            description: "Course de voitures au style arcade classique.",
            slug: "retro-racer",
        },
        {
            id: 5,
            name: "Puzzle Master",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Puzzle+Master",
            description: "Résolvez des énigmes complexes et stimulantes.",
            slug: "puzzle-master",
        },
        {
            id: 6,
            name: "Arena Fighter",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Arena+Fighter",
            description: "Combattez dans l'arène pour la gloire.",
            slug: "arena-fighter",
        },
        {
            id: 7,
            name: "Space Shooter X",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Space+Shooter+X",
            description: "Détruisez les envahisseurs de l'espace !",
            slug: "space-shooter-x",
        },
        {
            id: 8,
            name: "Pixel Runner",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Pixel+Runner",
            description: "Courez et sautez dans un monde pixelisé.",
            slug: "pixel-runner",
        },
        {
            id: 9,
            name: "Tower Defense Pro",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Tower+Defense",
            description: "Protégez votre base contre les vagues ennemies.",
            slug: "tower-defense-pro",
        },
        {
            id: 10,
            name: "Retro Racer",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Retro+Racer",
            description: "Course de voitures au style arcade classique.",
            slug: "retro-racer",
        },
        {
            id: 11,
            name: "Puzzle Master",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Puzzle+Master",
            description: "Résolvez des énigmes complexes et stimulantes.",
            slug: "puzzle-master",
        },
        {
            id: 12,
            name: "Arena Fighter",
            imageUrl: "https://placehold.co/600x400/8128c9/ffffff?text=Arena+Fighter",
            description: "Combattez dans l'arène pour la gloire.",
            slug: "arena-fighter",
        },
    ];

    // Couleur principale de votre site
    // const primaryColor = "#8128c9"; // Plus nécessaire ici si on utilise la valeur directement dans les classes

    // Fonction pour gérer les erreurs de chargement d'image
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.onerror = null; // Empêche les boucles infinies si l'image de remplacement échoue aussi
        target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Indisponible';
    }
</script>

<div class="bg-white min-h-screen max-md:pt-32 p-4 sm:p-8 font-sans">
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold text-[#8128c9]">
            Itis<span class="text-gray-800">Game</span>
        </h1>
        <p class="text-xl text-gray-600 mt-2">Votre destination pour les jeux d'arcade en ligne !</p>
    </header>

    <main class="px-4 md:px-[100px]">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Nos Jeux</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each games as game, i (game.id)}
                <a
                        href={`/jeux/${game.slug}`}
                        class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:border-[#8128c9]"
                        aria-label={`Jouer à ${game.name}`}
                        style="animation-delay: {i * 0.1}s;"
                >
                    <div class="relative">
                        <img
                                src={game.imageUrl}
                                alt={`Image de ${game.name}`}
                                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                on:error={handleImageError}
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <h3 class="text-2xl font-bold">{game.name}</h3>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#8128c9] transition-colors duration-300">{game.name}</h3>
                        <p class="text-gray-600 text-sm mb-4">{game.description}</p>
                        <button
                                class="w-full bg-[#8128c9] text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#8128c9] focus:ring-opacity-50"
                        >
                            Jouer maintenant
                        </button>
                    </div>
                </a>
            {/each}
        </div>
    </main>
</div>

<style>
    /* Vous pouvez ajouter des styles globaux ici si nécessaire,
       mais TailwindCSS devrait couvrir la plupart des besoins. */
    /* Assurez-vous que la police Inter est chargée si vous l'utilisez globalement */
    /* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap'); */
    /* body { font-family: 'Inter', sans-serif; } */

    /* Animation subtile pour l'en-tête */
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

    /* Animation pour les cartes de jeu à l'apparition */
    .grid > a {
        animation-name: fadeInUp;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards; /* Garde l'état final de l'animation */
        opacity: 0; /* Commence invisible, l'animation le rendra visible */
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