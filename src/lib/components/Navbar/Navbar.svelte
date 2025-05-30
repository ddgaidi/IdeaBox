<script lang="ts">
	import { Home, Lightbulb, PlusCircle, LifeBuoy, UserPlus, Menu, X, LogIn, User as UserIcon, LogOut } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { user, isAuthenticated } from '$lib/stores/auth'; // Importation des stores
	import { goto } from '$app/navigation'; // Pour la redirection

	import icon from '../../images/icon.png';

	let isOpen = false; // État pour gérer l'ouverture/fermeture du menu mobile

	// Données des liens de navigation de base
	const baseNavLinks = [
		{ name: 'Accueil', href: '/', icon: Home },
		{ name: 'Suggestions', href: '/suggestions', icon: Lightbulb },
		{ name: 'Poster une Suggestion', href: '/poster-suggestion', icon: PlusCircle },
		{ name: 'Support', href: '/support', icon: LifeBuoy },
	];

	// Fonction pour basculer l'état du menu mobile
	function toggleMenu() {
		isOpen = !isOpen;
	}

	// Fonction pour fermer le menu mobile lors du clic sur un lien
	function closeMenu() {
		isOpen = false;
	}

	async function handleLogout() {
		const response = await fetch('/api/auth/logout', {
			method: 'POST'
		});
		if (response.ok) {
			user.set(null);
			isAuthenticated.set(false);
			closeMenu(); // Fermer le menu si ouvert
			goto('/'); // Rediriger vers l'accueil
		} else {
			// Gérer l'erreur de déconnexion si nécessaire
			console.error('Erreur lors de la déconnexion');
		}
	}

	// Pour s'assurer que le script est chargé avant d'interagir avec le DOM
	onMount(() => {
		// Aucune opération DOM spécifique n'est nécessaire ici pour le moment,
		// mais onMount est utile pour les interactions futures.
	});
</script>

<!--
  La balise <nav> contient la barre de navigation principale.
  Elle utilise un dégradé de couleurs de fond et une ombre pour un effet visuel.
  La position relative et le z-index sont utilisés pour s'assurer qu'elle reste au-dessus des autres éléments.
-->
<nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg relative z-10 font-inter">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16 items-center">
			<div class="flex-shrink-0 flex items-center">
				<a href="/" class="flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105">
					<img class="h-10 w-auto shadow-md" src={icon} alt="Logo" />
				</a>
			</div>

			<div class="hidden md:flex items-center space-x-4 lg:space-x-6">
				{#each baseNavLinks as link}
					<a
						href={link.href}
						class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2
                   transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
						on:click={closeMenu}
					>
						<svelte:component this={link.icon} size={20} />
						<span>{link.name}</span>
					</a>
				{/each}

				{#if $isAuthenticated && $user}
					<a
						href="/profil"
						class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2
                   transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
						on:click={closeMenu}
					>
						<UserIcon size={20} />
						<span>Profil ({$user.pseudo})</span>
					</a>
					<button
						on:click={handleLogout}
						class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2
                   transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<LogOut size={20} />
						<span>Déconnexion</span>
					</button>
				{:else}
					<a
						href="/register"
						class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2
                   transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
						on:click={closeMenu}
					>
						<UserPlus size={20} />
						<span>Inscription</span>
					</a>
					<a
						href="/login"
						class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2
                   transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
						on:click={closeMenu}
					>
						<LogIn size={20} />
						<span>Connexion</span>
					</a>
				{/if}
			</div>

			<div class="md:hidden flex items-center">
				<button on:click={toggleMenu} class="text-gray-200 hover:text-white focus:outline-none transition-colors duration-300">
					{#if isOpen}
						<X size={28} class="animate-spin-once" />
					{:else}
						<Menu size={28} class="animate-spin-once-reverse" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!--
		Menu déroulant pour mobile.
		Utilise 'max-h-0' et 'overflow-hidden' pour masquer le menu lorsqu'il est fermé,
		et 'max-h-screen' pour le révéler.
		La transition 'transition-all duration-300 ease-in-out' assure une animation fluide.
	-->
	<div
		class="md:hidden bg-blue-700 overflow-hidden transition-all duration-300 ease-in-out"
		class:max-h-screen={isOpen}
		class:max-h-0={!isOpen}
	>
		<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
			{#each baseNavLinks as link}
				<a
					href={link.href}
					class="text-gray-200 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1"
					on:click={closeMenu}
				>
					<svelte:component this={link.icon} size={22} />
					<span>{link.name}</span>
				</a>
			{/each}

			{#if $isAuthenticated && $user}
				<a
					href="/profil"
					class="text-gray-200 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1"
					on:click={closeMenu}
				>
					<UserIcon size={22} />
					<span>Profil ({$user.pseudo})</span>
				</a>
				<button
					on:click={handleLogout}
					class="w-full text-left text-gray-200 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<LogOut size={22} />
					<span>Déconnexion</span>
				</button>
			{:else}
				<a
					href="/register"
					class="text-gray-200 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1"
					on:click={closeMenu}
				>
					<UserPlus size={22} />
					<span>Inscription</span>
				</a>
				<a
					href="/login"
					class="text-gray-200 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1"
					on:click={closeMenu}
				>
					<LogIn size={22} />
					<span>Connexion</span>
				</a>
			{/if}
		</div>
	</div>
</nav>

<style>
    /*
			Définit une animation de rotation pour l'icône de menu (X) lorsqu'elle apparaît.
			Elle tourne de 0 à 90 degrés.
		*/
    @keyframes spin-once {
        from { transform: rotate(0deg); }
        to { transform: rotate(90deg); }
    }

    /*
			Définit une animation de rotation inverse pour l'icône de menu (Menu) lorsqu'elle apparaît.
			Elle tourne de 90 à 0 degrés.
		*/
    @keyframes spin-once-reverse {
        from { transform: rotate(90deg); }
        to { transform: rotate(0deg); }
    }

    /*
			Applique l'animation 'spin-once' avec une durée de 0.3 secondes et une fonction d'accélération 'ease-in-out'.
		*/
    .animate-spin-once {
        animation: spin-once 0.3s ease-in-out forwards;
    }

    /*
			Applique l'animation 'spin-once-reverse' avec une durée de 0.3 secondes et une fonction d'accélération 'ease-in-out'.
		*/
    .animate-spin-once-reverse {
        animation: spin-once-reverse 0.3s ease-in-out forwards;
    }

    /*
			Définit la police Inter comme police par défaut pour le corps du document,
			assurant une apparence cohérente.
		*/
    body {
        font-family: 'Inter', sans-serif;
    }
</style>