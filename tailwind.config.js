/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./assets/js/**/*.js",
        "./vendor/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                'pink': '#f99898',
                'cream': '#fff3eb',
                'dark': '#1e1e1e',
                'blue': '#0580eb',
                'green': '#31915a',
                'red': '#f42a2a',
                'orange': '#fc7e38',
                'light-blue': '#83c5f2',
                'light-gray': '#f7f7f7',
                'gray-dark': '#2a2a2a',
                'gray-medium': '#afafaf',
                'coral': '#fd6a54',
            },
            fontFamily: {
                'primary': ['REM', 'sans-serif'],
                'secondary': ['Gaegu', 'cursive'],
            },
            borderRadius: {
                'default': '23px',
            },
            boxShadow: {
                'light': '0px 0px 10px rgba(0, 0, 0, 0.15)',
                'medium': '0 2px 28px 0 rgba(0, 0, 0, 0.06)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-right': 'fadeInRight 0.6s ease-out',
            },
        },
    },
    plugins: [],
}
