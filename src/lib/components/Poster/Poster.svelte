<script lang="ts">
	import SuggestionForm from '$lib/components/SuggestionForm/SuggestionForm.svelte';
	import { isAuthenticated } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login?redirectTo=/poster-suggestion');
		}
	});
</script>

<section class="min-h-screen text-white pt-10 pb-10 flex items-center justify-center px-6 md:px-12 bg-gradient-to-br from-blue-50 to-white">
	{#if $isAuthenticated}
		<div class="w-full max-w-2xl">
			<SuggestionForm />
		</div>
	{:else}
		<div class="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl">
			<h1 class="text-3xl font-extrabold text-white mb-4">Accès Restreint</h1>
			<p class="text-lg text-gray-200 mb-8">
				Vous devez être connecté pour accéder à cette page.
			</p>
			<button
				on:click={() => goto('/login?redirectTo=/poster-suggestion')}
				class="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-150 ease-in-out font-semibold"
			>
				Se connecter
			</button>
		</div>
	{/if}
</section>