/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				delft: {
					DEFAULT: "#293264",
					dark: "#4D5B9E",
					light: "#D6DBF5",
					soft: "#DBDEF0"
				},
				primary: "#F5F7FB",
				"razzle-rose": {
					DEFAULT: "#e118d4",
					700: "#bb10ac",
					800: "#98108a",
					900: "#7c136f",
					950: "#54004a"
				}
			},
			borderRadius: {
				lg: "15px"
			}
		}
	},
	plugins: []
};
