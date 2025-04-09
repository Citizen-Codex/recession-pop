module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'title': 'var(--font-title)',
        'robo': 'var(--font-robo)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    scrollSnapType: true,
    scrollSnapAlign: true,
    scrollBehavior: true,
  },
};
