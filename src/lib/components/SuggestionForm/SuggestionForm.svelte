<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { AlertTriangle, CheckCircle, Send } from 'lucide-svelte';

	export let onSuggestionPosted: () => void = () => {
		// Comportement par défaut modifié pour ne plus utiliser confirm() bloquant
		// et permettre au message de succès de s'afficher avant une éventuelle redirection.
		// La redirection peut être gérée par la page parente si nécessaire.
	};

	let title = '';
	let text = '';
	let fadeInClass = 'opacity-0 translate-y-4';
	let submissionMessage = '';
	let submissionError = '';
	let isSubmitting = false;

	onMount(() => {
		setTimeout(() => {
			fadeInClass = 'opacity-100 translate-y-0';
		}, 100);
	});

	async function handlePost() {
		submissionMessage = '';
		submissionError = '';
		isSubmitting = true;

		if (!title.trim() || !text.trim()) {
			submissionError = 'Le titre et le texte de la suggestion ne peuvent pas être vides.';
			isSubmitting = false;
			return;
		}

		if (!$isAuthenticated || !$user) {
			submissionError = 'Vous devez être connecté pour poster une suggestion.';
			isSubmitting = false;
			// Optionnel: rediriger vers login ici si on ne gère pas ça au niveau de la page
			// goto('/login?redirectTo=/poster-suggestion');
			return;
		}

		try {
			const response = await fetch('/api/suggestions/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, text })
			});

			const data = await response.json();

			if (!response.ok) {
				submissionError = data.error || `Erreur lors de l'envoi de la suggestion.`;
				return;
			}

			submissionMessage = 'Votre suggestion a été postée avec succès ! 🎉';
			title = '';
			text = '';
			if (onSuggestionPosted) {
				onSuggestionPosted(); // Appeler le callback
			}
			// Rediriger après un délai pour voir le message, ou laisser la page parente gérer
			setTimeout(() => {
				submissionMessage = ''; // Cacher le message après un délai
				goto('/suggestions'); // Redirection vers la liste des suggestions
			}, 3000);
		} catch (err) {
			console.error('Erreur lors de la publication de la suggestion :', err);
			if (err instanceof Error) {
				submissionError = `Une erreur réseau est survenue: ${err.message}`;
			} else {
				submissionError = 'Une erreur réseau est survenue. Veuillez réessayer.';
			}
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div
	class={`container mx-auto max-w-2xl bg-white rounded-xl shadow-2xl p-8 md:p-10 text-gray-900 transition-all transform duration-700 ${fadeInClass}`}
>
	{#if $isAuthenticated && $user}
		<h2
			class="text-2xl md:text-3xl font-bold text-center text-black mb-3"
		>
			Salut {$user.pseudo} !
		</h2>
		<p class="text-md text-center text-gray-600 mb-8">Partagez une nouvelle idée avec la communauté.</p>

		{#if submissionMessage}
			<div class="mb-6 p-4 bg-green-50 border border-green-300 text-green-700 rounded-lg flex items-center text-sm shadow">
				<CheckCircle class="inline-block mr-3 h-5 w-5 text-green-500" />
				{submissionMessage}
			</div>
		{/if}

		{#if submissionError}
			<div class="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg flex items-center text-sm shadow">
				<AlertTriangle class="inline-block mr-3 h-5 w-5 text-red-500" />
				{submissionError}
			</div>
		{/if}

		<form on:submit|preventDefault={handlePost} class="space-y-6">
			<div>
				<label for="suggestionTitle" class="block text-sm font-medium text-gray-700 mb-1">Titre de la suggestion</label>
				<input
					type="text"
					id="suggestionTitle"
					bind:value={title}
					placeholder="Un titre accrocheur pour votre idée"
					class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out placeholder-gray-400 bg-gray-50"
					disabled={isSubmitting}
				/>
			</div>
			<div>
				<label for="suggestionText" class="block text-sm font-medium text-gray-700 mb-1">Description détaillée</label>
				<textarea
					id="suggestionText"
					bind:value={text}
					rows="5"
					placeholder="Décrivez votre suggestion en détail..."
					class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out placeholder-gray-400 bg-gray-50 resize-none"
					disabled={isSubmitting}
				></textarea>
			</div>
			<div>
				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
				>
					<Send class="mr-2 h-5 w-5" />
					{isSubmitting ? 'Envoi en cours...' : 'Poster la suggestion'}
				</button>
			</div>
		</form>
	{:else}
		<!-- Ce cas ne devrait pas être atteint si la page parente gère l'authentification -->
		<p class="text-center text-red-500">Vous devez être connecté pour poster une suggestion.</p>
		<div class="mt-4 text-center">
			<a href="/login" class="text-blue-600 hover:underline">Se connecter</a>
		</div>
	{/if}
</div>