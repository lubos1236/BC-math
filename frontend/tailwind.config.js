// tailwind.config.js
export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                light: {
                    background: '#ffffff',
                    card: '#f3f4f6',
                    card2: '#e5e7eb',
                    text: '#111827',
                },
                dark: {
                    background: '#111827',
                    card: '#1F2937',
                    card2: '#374151',
                    text: '#E4E6EB',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
