// server/api/game-dashboard.js - Basitleştirilmiş Nuxt 4 versiyonu
export default defineEventHandler(async (event) => {
  const gameId = '578080'
  
  try {
    console.log('🚀 [Nuxt 4] Fetching dashboard data for game:', gameId)
    
    // Basit paralel API çağrıları
    const [overviewRes, performanceRes, streamRes] = await Promise.allSettled([
      $fetch(`https://dhcase-mockapi.vercel.app/api/game/${gameId}/overview`),
      $fetch(`https://dhcase-mockapi.vercel.app/api/game/${gameId}/performance`),
      $fetch(`https://dhcase-mockapi.vercel.app/api/game/${gameId}/stream`)
    ])

    console.log('📊 API Results:', {
      overview: overviewRes.status,
      performance: performanceRes.status,
      stream: streamRes.status
    })

    // Promise.allSettled sonuçlarını işle
    const overview = overviewRes.status === 'fulfilled' ? overviewRes.value : {
      name: 'Error Loading Game',
      price: 0,
      downloads: 0,
      revenue: 0,
      description: 'Failed to load overview data'
    }

    const performance = performanceRes.status === 'fulfilled' ? performanceRes.value : {
      dates: [],
      watchTime: [],
      engagement: []
    }

    const stream = streamRes.status === 'fulfilled' ? streamRes.value : {
      dailyStreamCounts: {},
      hoursWatched: { value: 0, delta: 0, deltaPercentage: 0 },
      averageViewers: { value: 0, delta: 0, deltaPercentage: 0 }
    }

    // Başarılı response dön
    const dashboardData = {
      // Overview data
      name: overview.name || 'Unknown Game',
      price: overview.price || 0,
      downloads: overview.downloads || 0,
      revenue: overview.revenue || 0,
      description: overview.description || 'No description available',
      
      // Performance data
      performance: {
        dates: performance.dates || [],
        watchTime: performance.watchTime || [],
        engagement: performance.engagement || []
      },
      
      // Stream data
      stream: {
        dailyStreamCounts: stream.dailyStreamCounts || {},
        hoursWatched: stream.hoursWatched || { value: 0, delta: 0, deltaPercentage: 0 },
        averageViewers: stream.averageViewers || { value: 0, delta: 0, deltaPercentage: 0 }
      },
      
      // Meta data
      _timestamp: Date.now(),
      _success: true,
      _errors: [
        overviewRes.status === 'rejected' ? overviewRes.reason.message : null,
        performanceRes.status === 'rejected' ? performanceRes.reason.message : null,
        streamRes.status === 'rejected' ? streamRes.reason.message : null
      ].filter(Boolean)
    }

    console.log('✅ [Nuxt 4] Dashboard data prepared successfully')
    return dashboardData
    
  } catch (error) {
    console.error('❌ [Nuxt 4] Dashboard API Error:', error.message)
    
    // Basit error response
    throw createError({
      statusCode: 500,
      statusMessage: 'Dashboard API Error',
      message: error.message
    })
  }
})