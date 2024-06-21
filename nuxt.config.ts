export default defineNuxtConfig({
  app: {
    head: {
      title: "RAMGPT",
      viewport: "initial-scale=1.0, interactive-widget=resizes-content",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  runtimeConfig: {
    public: {
    },
    private: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  },
});
