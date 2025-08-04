// nuxt.config.ts - Nuxt 4.0 için düzeltilmiş config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  // Nuxt 4.0 modules
  modules: ['@nuxt/ui'],
  
  // CSS
  css: ['~/assets/css/main.css'],
  
  // Development ayarları
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: 'localhost'
  },

  // Nitro engine ayarları (Nuxt 4 için)
  nitro: {
    experimental: {
      wasm: true
    },
    // API routes için CORS
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  },

  // Build optimization
  build: {
    transpile: ['vue-chartjs', 'chart.js']
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (server-side only)
    private: {},
    
    // Public keys (client-side)
    public: {
      apiBase: process.env.API_BASE_URL || 'https://dhcase-mockapi.vercel.app'
    }
  },

  // App config
  app: {
    head: {
      title: 'Game Dashboard - Nuxt 4',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})