// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#2C3E50', // or use HSL/RGB format if matching your :root values
        background: '#f9f9f9',
        border: '#E2E8F0',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        primary: '#0077ff',
        'primary-foreground': '#FAFAFA',
        secondary: '#F1F5F9',
        'secondary-foreground': '#2C3E50',
        accent: '#10B981',
        'accent-foreground': '#FAFAFA',
        destructive: '#EF4444',
        'destructive-foreground': '#FAFAFA',
      }
    }
  },
  plugins: [],
}
