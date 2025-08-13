/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'daneki-primary': '#3B82F6',
        'daneki-secondary': '#8B5CF6',
        'daneki-accent': '#8FD3E8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        'daneki-light': {
          'primary': '#3B82F6',
          'secondary': '#8B5CF6',
          'accent': '#8FD3E8',
          'neutral': '#1f2937',
          'base-100': '#F5F7FA',
          'info': '#67E8F9',
          'success': '#7FD1B9',
          'warning': '#F5D08B',
          'error': '#F69B9B',
        },
        'daneki-dark': {
          'primary': '#8FD3E8',
          'secondary': '#BBA7F0',
          'accent': '#8FD3E8',
          'neutral': '#1B2433',
          'base-100': '#121823',
          'base-200': '#1B2433',
          'base-300': '#2E3A52',
          'info': '#67E8F9',
          'success': '#7FD1B9',
          'warning': '#F5D08B',
          'error': '#F69B9B',
          '--rounded-btn': '0.75rem',
          '--btn-text-case': 'none',
        },
      },
    ],
  },
}
