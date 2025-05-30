<script lang="ts">
	import { Home, Lightbulb, PlusCircle, LifeBuoy, UserPlus, Menu, X, LogIn, User as UserIcon, LogOut } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	import icon from '../../images/icon.png';

	let isOpen = false;

	const baseNavLinks = [
		{ name: 'Accueil', href: '/', icon: Home },
		{ name: 'Suggestions', href: '/suggestions', icon: Lightbulb },
		{ name: 'Poster une Suggestion', href: '/poster-suggestion', icon: PlusCircle },
		{ name: 'Support', href: '/support', icon: LifeBuoy },
	];

	function toggleMenu() {
		isOpen = !isOpen;
	}

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
			closeMenu();
			await goto('/');
		} else {
			console.error('Erreur lors de la déconnexion');
		}
	}

	onMount(() => {
	});
</script>

<nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg relative z-10 font-inter">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16 items-center">
			<div class="flex-shrink-0 flex items-center">
				<a href="/" class="flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105">
					<img class="h-10 w-auto shadow-md rounded-md" src={icon} alt="Logo" />
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

	<div
		class="md:hidden bg-blue-700 overflow-hidden transition-all duration-300 ease-in-out"
		class:max-h-screen={isOpen}
		class:max-h-0={!isOpen}
	>
		<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
			{#each baseNavLinks as link}
				<a
					href={link.href}
					class="text-gray-200 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
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
					class="text-gray-200 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1"
					on:click={closeMenu}
				>
					<UserIcon size={22} />
					<span>Profil ({$user.pseudo})</span>
				</a>
				<button
					on:click={handleLogout}
					class="w-full text-left text-gray-200 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<LogOut size={22} />
					<span>Déconnexion</span>
				</button>
			{:else}
				<a
					href="/register"
					class="text-gray-200 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                 transition-colors duration-300 ease-in-out hover:translate-x-1"
					on:click={closeMenu}
				>
					<UserPlus size={22} />
					<span>Inscription</span>
				</a>
				<a
					href="/login"
					class="text-gray-200 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
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

<style global>
    @keyframes spin-once {
        from { transform: rotate(0deg); }
        to { transform: rotate(90deg); }
    }

    @keyframes spin-once-reverse {
        from { transform: rotate(90deg); }
        to { transform: rotate(0deg); }
    }
</style>