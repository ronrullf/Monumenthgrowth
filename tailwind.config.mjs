/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        cta: 'var(--cta)',
        'cta-hover': 'var(--cta-hover)',
        'cta-text': 'var(--cta-text)',
        destructive: 'var(--destructive)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        card: '0.75rem',
      },
      boxShadow: {
        sm: '0 2px 6px rgba(0,0,0,0.08)',
        md: '0 4px 10px rgba(0,0,0,0.10)',
        lg: '0 12px 28px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        container: '1200px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      letterSpacing: {
        base: '0.01em',
        eyebrow: '0.08em',
      },
    },
  },
  plugins: [],
};
