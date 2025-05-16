<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let pseudonyme = ''; // Pseudonyme récupéré du backend
	let suggestion = ''; // Contenu de la suggestion
	let fadeInClass = 'opacity-0 translate-y-4'; // Classe CSS pour animation
	let isLoggedIn = false; // Statut de connexion

	// Récupérer le pseudonyme au chargement
	onMount(async () => {
		try {
			// Ajout de l'animation en fade-in
			setTimeout(() => {
				fadeInClass = 'opacity-100 translate-y-0';
			}, 100);

			// Vérifier si un utilisateur est connecté
			const token = localStorage.getItem('jwt');
			if (!token) {
				isLoggedIn = false; // Pas de token, l'utilisateur n'est pas connecté
				return;
			}

			// Envoi d'une requête pour récupérer les données (le pseudonyme)
			const response = await fetch('http://localhost:3000/profil', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				isLoggedIn = false; // Erreur, on considère l'utilisateur comme non connecté
				return;
			}

			isLoggedIn = true; // L'utilisateur est connecté
			const data = await response.json();
			pseudonyme = data.pseudonyme; // Stocker le pseudonyme pour pré-remplir l'affichage
		} catch (err) {
			isLoggedIn = false; // En cas d'erreur réseau, on considère l'utilisateur comme non connecté
			console.error('Erreur lors de la récupération du pseudonyme :', err);
		}
	});

	// Poster la suggestion
	async function handlePost() {
		if (!suggestion.trim()) {
			alert('Veuillez entrer une suggestion avant de la poster !');
			return;
		}

		try {
			// Envoi de la suggestion au backend avec le pseudonyme
			const token = localStorage.getItem('jwt');
			if (!token) {
				alert("Vous n'êtes pas connecté.");
				goto('/login'); // Redirection si le token est manquant
				return;
			}

			const response = await fetch('http://localhost:3000/post-suggestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content: suggestion }), // Seul le contenu est envoyé, le pseudonyme est géré côté backend
			});

			if (!response.ok) {
				const error = await response.text();
				alert(`Erreur lors de l'envoi : ${error}`);
				return;
			}

			alert('Votre suggestion a été postée avec succès ! 🎉');
			suggestion = ''; // Réinitialisation du champ après un succès
		} catch (err) {
			console.error('Erreur lors de la publication de la suggestion :', err);
			alert('Une erreur réseau est survenue. Veuillez réessayer.');
		}
	}

	// Rediriger vers la page de connexion
	function redirectToLogin() {
		goto('/login');
	}
</script>

<section class="relative text-white pt-10 min-h-screen flex items-center px-6 md:px-12">
	<div
		class={`container mx-auto max-w-4xl bg-white rounded-lg p-8 text-gray-900 drop-shadow-xl transition-all transform duration-700 ${fadeInClass}`}
	>
		{#if isLoggedIn}
			<!-- Message de bienvenue -->
			<h1 class="text-3xl font-extrabold text-center text-purple-700 mb-4">
				Salut {pseudonyme} ! 👋
			</h1>
			<p class="text-lg text-center text-gray-700 mb-8">
				Envie de faire part d'une nouvelle suggestion ?
			</p>

			<!-- Zone de texte pour entrer la suggestion -->
			<div class="mb-4">
				<textarea
					bind:value={suggestion}
					placeholder="Partagez votre idée ici..."
					class="w-full h-40 p-4 text-gray-800 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-300 outline-none resize-none"
				></textarea>
			</div>

			<!-- Bouton Poster -->
			<div class="text-center">
				<button
					on:click={handlePost}
					class="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
				>
					Poster votre idée 🚀
				</button>
			</div>
		{:else}
			<!-- Message si l'utilisateur n'est pas connecté -->
			<h1 class="text-3xl font-extrabold text-center text-red-600 mb-4">
				Connectez-vous pour poster une suggestion !
			</h1>
			<p class="text-lg text-center text-gray-700 mb-8">
				Vous devez être connecté pour soumettre une nouvelle idée.
			</p>

			<!-- Bouton vers la connexion -->
			<div class="text-center">
				<button
					on:click={redirectToLogin}
					class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
				>
					Se connecter 🔑
				</button>
			</div>
		{/if}
	</div>
</section>