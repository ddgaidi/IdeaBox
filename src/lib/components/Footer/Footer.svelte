<script>
	import pp from '$lib/images/pp.png';
</script>

<footer class="relative flex items-center justify-center z-20 py-4 text-center text-gray-600 bg-gray-100 border-t border-gray-200">
	<a href="https://github.com/ddgaidi" class="hover:scale-105 mr-4 transition-transform duration-300" target="_blank">
	<img
		src={pp}
		alt=""
		class="w-10"
		oncontextmenu={e => e.preventDefault()}
		draggable={false}
	/>
	</a>
	<p>&copy; {new Date().getFullYear()} <span class="text-blue-600 font-bold">IdeaBox</span>. Tous droits réservés.</p>
</footer>