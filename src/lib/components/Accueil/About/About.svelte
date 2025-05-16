<script>
	import { onMount } from 'svelte';

	// Classe appliquée dynamiquement pour l'animation
	let fadeInClass = 'opacity-0 translate-y-4';

	onMount(() => {
		setTimeout(() => {
			fadeInClass = 'opacity-100 translate-y-0';
		}, 100); // Ajoute un délai pour la transition
	});
</script>

<section class="relative text-white pt-10 min-h-screen flex items-center px-6 md:px-12">
	<div
		class={`container mx-auto max-w-4xl bg-white rounded-lg p-8 text-gray-900 drop-shadow-xl transition-all transform duration-700 ${fadeInClass}`}
	>
		<!-- Titre -->
		<h1 class="text-4xl font-extrabold text-center text-purple-700 mb-6">
			Bienvenue sur <span class="text-indigo-600">IdeaBox</span>
		</h1>
		<p class="text-lg text-center text-gray-700 mb-8">
			La plateforme communautaire où vos idées prennent vie. 💡
		</p>

		<!-- Section des fonctionnalités -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Fonctionnalité 1 -->
			<div class="flex items-start space-x-4">
				<div class="text-purple-700 text-3xl">🔐</div>
				<div>
					<h2 class="text-lg font-bold text-gray-800">Connexion / Inscription</h2>
					<p class="text-gray-600">
						Rejoignez la communauté en quelques clics et commencez à partager vos idées.
					</p>
				</div>
			</div>

			<!-- Fonctionnalité 2 -->
			<div class="flex items-start space-x-4">
				<div class="text-purple-700 text-3xl">🧠</div>
				<div>
					<h2 class="text-lg font-bold text-gray-800">Ajout d'idées</h2>
					<p class="text-gray-600">
						Proposez vos idées et laissez les autres membres les découvrir et y réagir.
					</p>
				</div>
			</div>

			<!-- Fonctionnalité 3 -->
			<div class="flex items-start space-x-4">
				<div class="text-purple-700 text-3xl">👍👎</div>
				<div>
					<h2 class="text-lg font-bold text-gray-800">Votes</h2>
					<p class="text-gray-600">
						Votez pour ou contre les idées proposées par la communauté.
					</p>
				</div>
			</div>

			<!-- Fonctionnalité 4 -->
			<div class="flex items-start space-x-4">
				<div class="text-purple-700 text-3xl">🕒</div>
				<div>
					<h2 class="text-lg font-bold text-gray-800">Mise à jour en temps réel</h2>
					<p class="text-gray-600">
						Suivez les idées et les votes en temps réel grâce à notre technologie WebSocket.
					</p>
				</div>
			</div>

			<!-- Fonctionnalité bonus -->
			<div class="flex items-start space-x-4">
				<div class="text-purple-700 text-3xl">🔍</div>
				<div>
					<h2 class="text-lg font-bold text-gray-800">Filtrage dynamique</h2>
					<p class="text-gray-600">
						Triez facilement les idées par popularité ou par leur date de création.
					</p>
				</div>
			</div>
		</div>

		<!-- Appel à l'action -->
		<div class="mt-10 text-center">
			<h3 class="text-2xl font-semibold text-gray-800">
				Rejoignez-nous dès maintenant !
			</h3>
			<p class="text-gray-600 mb-6">
				Partagez vos idées, votez pour les meilleures et faites partie du changement.
			</p>
			<a
				href="/signup"
				class="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
			>
				Rejoindre IdeaBox 🚀
			</a>
		</div>
	</div>
</section>