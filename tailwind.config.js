/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                lightYellow: '#faf3dd',
                tan: '#c8d5b9',
                green: '#8fc0a9',
                teal: '#89c1bd',
                blueGray: '#696d7d',
                lightGray: '#efefef',
                white: '#ffffff'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        }
    },
    plugins: [],
    darkMode: 'class'
}
