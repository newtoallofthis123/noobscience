/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				primary: 'rgb(var(--primary) / <alpha-value>)',
				bg: 'rgb(var(--bg) / <alpha-value>)',
				dark: '#171417',
				light: '#fbfcff',
				sky: {
					400: "#00cbec"
				},
				yellow: {
					400: "#facc15"
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['"Archivo Black"', 'sans-serif'],
				serif: ['"Libre Baskerville"', 'serif']
			},
		},
	},
	darkMode: 'class',
	plugins: [],
}
