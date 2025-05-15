<script lang="ts">
    import icon from '../../images/icon.png'
</script>

<div class="flex fixed justify-between w-screen items-center z-10 bg-[#3771D3] py-2 px-8" id="navbar-container">

    <div class="ml-12" id="icon-container">
        <img src={icon} alt="Logo" draggable="false" class="w-12" />
    </div>

    <div class="flex space-x-16" id="pages-container">
        <a href="/" class="flex items-center justify-center group">
            <div class="flex gap-2 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex size-6 text-[#b5cdf5] group-hover:text-white transition-all duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span class="text-[#b5cdf5] font-bold group-hover:text-white transition-all duration-300">Accueil</span>
            </div>
        </a>

        <a href="/suggestions" class="flex items-center justify-center group">
            <div class="flex gap-2 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex size-6 text-[#b5cdf5] group-hover:text-white transition-all duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <span class="text-[#b5cdf5] font-bold group-hover:text-white transition-all duration-300">Suggestions</span>
            </div>
        </a>

        <a href="/poster-suggestion" class="flex items-center justify-center group">
            <div class="flex gap-2 transition-all duration-300 bg-white hover:bg-[#4D83DF] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex size-6 text-[#4D83DF] group-hover:text-white transition-all duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <span class="text-[#4D83DF] font-bold group-hover:text-white transition-all duration-300">Poster votre suggestion</span>
            </div>
        </a>
    </div>

    <div id="right-container" class="flex space-x-8 mr-12">
        <a href="/profil" id="profile-container" class="hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-[#b5cdf5] hover:text-white transition-all duration-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </a>
    </div>
</div>