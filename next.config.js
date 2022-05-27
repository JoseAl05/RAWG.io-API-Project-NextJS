module.exports = {
  /** @type {import('next').NextConfig} */
    exportPathMap: async function() {
      const paths = {
        '/': { page: '/' }
      };
      return paths; //<--this was missing previously
    },
    reactStrictMode: true,
    images: {
      domains: ['media.rawg.io'],
    },
}