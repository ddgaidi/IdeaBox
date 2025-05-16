<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Éléments du profil utilisateur
	let pseudonyme: string = '';
	let email: string = '';
	let newPassword: string = '';

	// Classe appliquée dynamiquement pour l'animation
	let fadeInClass = 'opacity-0 translate-y-4';

	// Gestion de l'animation à l'affichage
	onMount(async () => {
		try {
			// Ajout de l'animation
			setTimeout(() => {
				fadeInClass = 'opacity-100 translate-y-0';
			}, 100);

			// Récupération des données utilisateur
			const token = localStorage.getItem('jwt'); // Récupère le token
			if (!token) {
				alert('Vous n’êtes pas connecté.');
				goto('/login'); // Redirection vers la page de connexion si pas de token
				return;
			}

			const response = await fetch('http://localhost:3000/profil', {
				headers: {
					Authorization: `Bearer ${token}`, // Transmettre le token au backend
				},
			});

			if (!response.ok) {
				alert('Impossible de récupérer vos informations utilisateur.');
				goto('/login'); // Redirection en cas de problème
				return;
			}

			const data = await response.json();
			pseudonyme = data.pseudonyme;
			email = data.email;
		} catch (err) {
			console.error('Erreur lors de la récupération du profil :', err);
			alert('Une erreur est survenue. Veuillez réessayer plus tard.');
		}
	});

	// Sauvegarde des modifications du profil
	const saveChanges = async () => {
		try {
			const token = localStorage.getItem('jwt');
			if (!token) {
				alert('Vous n’êtes pas connecté.');
				goto('/login');
				return;
			}

			const response = await fetch('http://localhost:3000/update-profil', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					pseudonyme,
					email,
					password: newPassword || undefined, // Met à jour uniquement si un nouveau mot de passe est fourni
				}),
			});

			if (!response.ok) {
				const error = await response.text();
				alert(`Erreur : ${error}`);
				return;
			}

			alert('Votre profil a été mis à jour avec succès.');
			newPassword = ''; // Réinitialise le champ du mot de passe
		} catch (err) {
			console.error('Erreur lors de la mise à jour du profil :', err);
			alert('Une erreur est survenue. Veuillez réessayer plus tard.');
		}
	};

	// Déconnexion de l'utilisateur
	const logout = () => {
		localStorage.removeItem('jwt');
		alert('Vous avez été déconnecté.');
		goto('/login'); // Redirection vers la page de connexion
	};
</script>

<section class="relative text-white pt-10 min-h-screen flex items-center px-6 md:px-12">
	<div
		class={`container mx-auto max-w-4xl bg-white rounded-lg p-8 text-gray-900 drop-shadow-xl transition-all transform duration-700 ${fadeInClass}`}
	>
		<!-- Titre -->
		<h1 class="text-4xl font-extrabold text-center text-purple-700 mb-6">
			Mon <span class="text-indigo-600">Profil</span>
		</h1>
		<p class="text-lg text-center text-gray-700 mb-8">
			Gérez vos informations personnelles et mettez à jour votre compte.
		</p>

		<!-- Formulaire pour modifier les informations -->
		<div class="space-y-6">
			<!-- Pseudonyme -->
			<div class="flex flex-col">
				<label for="pseudonyme" class="block text-gray-700 font-medium">Pseudonyme</label>
				<input
					id="pseudonyme"
					type="text"
					bind:value={pseudonyme}
					class="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
				/>
			</div>

			<!-- Email -->
			<div class="flex flex-col">
				<label for="email" class="block text-gray-700 font-medium">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					class="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
				/>
			</div>

			<!-- Nouveau mot de passe -->
			<div class="flex flex-col">
				<label for="password" class="block text-gray-700 font-medium">Nouveau mot de passe</label>
				<input
					id="password"
					type="password"
					bind:value={newPassword}
					placeholder="Laissez vide pour ne pas modifier"
					class="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
				/>
			</div>

			<!-- Boutons -->
			<div class="mt-6 flex justify-between">
				<!-- Enregistrer les modifications -->
				<button
					on:click={saveChanges}
					class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-500 transition"
				>
					Enregistrer les modifications
				</button>

				<!-- Déconnexion -->
				<button
					on:click={logout}
					class="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-500 transition"
				>
					Déconnexion
				</button>
			</div>
		</div>
	</div>
</section>