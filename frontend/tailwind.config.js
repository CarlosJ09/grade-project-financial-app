/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#7BCFA3',
        secondary: '#22577A',
        success: '#9AE6B4',
        'success-light': '#C6F6D5',
        background: '#E0F8E0',
        'text-primary': '#333333',
        error: '#D32F2F',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'poppins-light': ['Poppins_300Light', 'sans-serif'],
        'poppins-regular': ['Poppins_400Regular', 'sans-serif'],
        'poppins-medium': ['Poppins_500Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins_600SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
