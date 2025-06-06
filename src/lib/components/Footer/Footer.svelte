<script>
	import pp from '$lib/images/pp.png';
</script>

<footer class="relative flex items-center justify-center z-20 py-4 text-center text-gray-600 bg-gray-100 border-t border-gray-200">
	<img
		src={pp}
		alt=""
		class="w-10 mr-4"
		oncontextmenu={e => e.preventDefault()}
		draggable={false}
	/>
	<p>&copy; {new Date().getFullYear()} <span class="text-blue-600 font-bold">IdeaBox</span> Tous droits réservés.</p>
</footer>