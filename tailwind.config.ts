import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // Active le mode sombre avec la classe "dark"
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'], // Ajout de la police Exo 2
      },
			colors: {
        dml: '#8128c9',  // Remplacez par la couleur que vous voulez
      },
		}
	},

	plugins: [
		require('tailwindcss-filters'),
	]
} satisfies Config;
