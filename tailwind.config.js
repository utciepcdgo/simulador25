/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './*.{html,js}',
        './modules/*.js',
        './node_modules/flowbite/**/*.js'
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ]
}

