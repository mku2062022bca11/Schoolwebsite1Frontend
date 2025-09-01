/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,jsx}"],
  safelist: [
    'text-blue-600', 'text-blue-700', 'text-blue-400', 'text-blue-500',
    'text-yellow-400', 'text-yellow-300', 'text-blue-200', 'text-blue-300',
    'bg-blue-600', 'bg-blue-700', 'bg-blue-400', 'bg-blue-500',
    'bg-blue-50', 'bg-blue-900',
    'hover:bg-blue-700', 'hover:bg-blue-500',
    'border-blue-600', 'border-blue-400',
    'hover:text-blue-600', 'hover:text-blue-700', 'hover:text-blue-400', 'hover:text-blue-500',
    'bg-blue-100', 'hover:bg-blue-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
