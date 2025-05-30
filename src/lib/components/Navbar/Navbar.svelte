<script lang="ts">
    import { Home, Lightbulb, PlusCircle, LifeBuoy, UserPlus, Menu, X } from 'lucide-svelte'; // Utilisation de lucide-svelte pour les icônes
    import { onMount } from 'svelte';

    import icon from '../../images/icon.png';

    let isOpen = false; // État pour gérer l'ouverture/fermeture du menu mobile

    // Données des liens de navigation
    const navLinks = [
        { name: 'Accueil', href: '/', icon: Home },
        { name: 'Suggestions', href: '/suggestions', icon: Lightbulb },
        { name: 'Poster une Suggestion', href: '/poster-suggestion', icon: PlusCircle },
        { name: 'Support', href: '/support', icon: LifeBuoy },
        { name: 'Inscription', href: '/register', icon: UserPlus },
    ];

    // Fonction pour basculer l'état du menu mobile
    function toggleMenu() {
        isOpen = !isOpen;
    }

    // Fonction pour fermer le menu mobile lors du clic sur un lien
    function closeMenu() {
        isOpen = false;
    }

    // Pour s'assurer que le script est chargé avant d'interagir avec le DOM
    onMount(() => {
        // Aucune opération DOM spécifique n'est nécessaire ici pour le moment,
        // mais onMount est utile pour les interactions futures.
    });
</script>

<nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
            <div class="flex-shrink-0 flex items-center">
                <div class="flex items-center text-white text-2xl font-extrabold tracking-tight">
                    <img src={icon} alt="Icone" class="w-10"/>
                </div>
            </div>

            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                    {#each navLinks as link (link.name)}
                        <a
                          href={link.href}
                          class="text-blue-100 hover:bg-blue-700 hover:text-white
                         px-3 py-2 rounded-md text-sm font-medium
                         transition duration-300 ease-in-out transform hover:scale-105
                         flex items-center group"
                        >
                            <svelte:component this={link.icon} class="h-4 w-4 mr-2 text-blue-200 group-hover:text-white transition duration-300" />
                            {link.name}
                        </a>
                    {/each}
                </div>
            </div>

            <div class="-mr-2 flex md:hidden">
                <button
                  on:click={toggleMenu}
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md
                     text-blue-200 hover:text-white hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                    <span class="sr-only">Ouvrir le menu principal</span>
                    {#if isOpen}
                        <X class="block h-6 w-6" aria-hidden="true" />
                    {:else}
                        <Menu class="block h-6 w-6" aria-hidden="true" />
                    {/if}
                </button>
            </div>
        </div>
    </div>

    <div class="{isOpen ? 'block' : 'hidden'} md:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {#each navLinks as link (link.name)}
                <a
                  href={link.href}
                  class="text-blue-100 hover:bg-blue-700 hover:text-white
                     block px-3 py-2 rounded-md text-base font-medium
                     transition duration-300 ease-in-out transform hover:scale-105
                     flex items-center group"
                  on:click={closeMenu} >
                    <svelte:component this={link.icon} class="h-5 w-5 mr-3 text-blue-200 group-hover:text-white transition duration-300" />
                    {link.name}
                </a>
            {/each}
        </div>
    </div>
</nav>

<style lang="postcss">
    /* Vous pouvez ajouter des styles globaux ou spécifiques ici si nécessaire */
    /* Par exemple, pour définir la police Inter si elle n'est pas déjà définie globalement */
    /*
		:global(body) {
			font-family: 'Inter', sans-serif;
		}
		*/
</style>