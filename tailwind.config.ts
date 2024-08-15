import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      keyframes: {
        "fade-in" : {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        "fade-out" : {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        }
      },
      animation: {
        openmodal: 'fade-in 0.2s ease-in',
        closemodal: ' fade-out 0.2s ease-out',

      } ,
      
      colors: {
        primary: {"50":"#fcf3f7","100":"#fbe8f1","200":"#f8d2e4","300":"#f4adcd","400":"#ec7aab","500":"#e2528b","600":"#d03268","700":"#b42251","800":"#951f43","900":"#651930","950":"#4b0c1f"},
        secondary: {"50":"#f8f4ee","100":"#eee5d3","200":"#dfcba9","300":"#cda877","400":"#bd8c52","500":"#b17a45","600":"#965e38","700":"#784830","800":"#653c2e","900":"#653c2e","950":"#321b16"},
      },
      fontFamily :{
        'body': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ]
      }
    },
  },
  plugins: [],
}
export default config
