<script>
	export let pseudonyme; // Nom de l'utilisateur
	export let date; // Date de publication
	export let idee; // Contenu de la suggestion
	export let upvotes = 0; // Nombre de votes positifs
	export let downvotes = 0; // Nombre de votes négatifs

	// Gestion des votes positifs
	const handleUpvote = () => {
		upvotes++;
	};

	// Gestion des votes négatifs
	const handleDownvote = () => {
		downvotes++;
	};
</script>

<div class="bg-white rounded-xl shadow-lg p-6 mx-4 flex flex-col justify-between w-64 text-gray-900">
	<!-- Header contenant le pseudonyme et la date -->
	<div class="mb-4">
		<h3 class="text-lg font-semibold text-purple-700">{pseudonyme}</h3>
		<p class="text-sm text-gray-600">{date}</p>
	</div>

	<!-- Idée -->
	<p class="text-gray-700 mb-6">{idee}</p>

	<!-- Votes et boutons -->
	<div class="flex items-center justify-between">
		<div class="flex space-x-2">
			<!-- Bouton Upvote -->
			<button
				on:click={handleUpvote}
				class="flex gap-2 bg-indigo-600 text-white px-3 py-1 rounded-lg shadow hover:bg-indigo-500 transition"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
					/>
				</svg>
				{upvotes} <!-- Affiche le compteur d'upvotes -->
			</button>

			<!-- Bouton Downvote -->
			<button
				on:click={handleDownvote}
				class="flex gap-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-400 transition"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
					/>
				</svg>
				{downvotes} <!-- Affiche le compteur de downvotes -->
			</button>
		</div>
	</div>
</div>

<style>
    /* Ajout d'une animation subtile au hover */
    div:hover {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
</style>