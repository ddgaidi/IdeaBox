<script lang="ts">
    import { goto } from '$app/navigation';
    import icon from '../../images/icon.png';

    // Vérifier si l'utilisateur est connecté
    const isConnected = () => {
        // Vérifie si le token `jwt` est présent dans localStorage
        const token = localStorage.getItem('jwt');
        return Boolean(token); // Retourne true si un token existe, sinon false
    };

    // Gestion du clic sur le bouton
    const handleProfileClick = () => {
        if (isConnected()) {
            goto('/profil'); // Redirige vers la page profil si connecté
        } else {
            goto('/login'); // Sinon, redirige vers la page login
        }
    };
</script>

<nav
  class="bg-gradient-to-b from-indigo-900 to-purple-600 text-white fixed w-full z-10 shadow-lg transition-transform duration-500"
>
    <div class="container mx-auto px-6 md:px-12 flex items-center justify-between py-4">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3">
            <img src={icon} alt="Logo" class="w-10 h-10" />
            <span class="text-2xl font-bold text-white">IdeaBox</span>
        </a>

        <!-- Navigation Links -->
        <div class="flex space-x-6 items-center">
            <a
              href="/"
              class="text-lg font-semibold hover:text-indigo-300 transition-colors duration-300"
            >Accueil</a
            >
            <a
              href="/suggestions"
              class="text-lg font-semibold hover:text-indigo-300 transition-colors duration-300"
            >Suggestions</a
            >
            <a
              href="/poster-suggestion"
              class="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
            >Poster une suggestion</a
            >

            <!-- Bouton à droite (gestion via handleProfileClick) -->
            <button
              on:click={handleProfileClick}
              class="hover:scale-110 transition duration-300 focus:outline-none"
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="w-8 h-8 text-white hover:text-indigo-300"
                >
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
            </button>
        </div>
    </div>
</nav>