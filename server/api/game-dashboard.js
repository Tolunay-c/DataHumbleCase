// server/api/game-dashboard.js
export default defineEventHandler(async (event) => {
  const gameId = '578080'
  
  try {
    console.log('🚀 API endpoint called:', event.node.req.url)
    
    // Test için basit response
    const testData = {
      name: 'Test Game',
      price: 29.99,
      downloads: 150000,
      revenue: 4500000,
      description: 'This is a test game description for debugging purposes.',
      performance: {
        dates: ['2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05'],
        watchTime: [2, 4, 6, 8, 10],
        engagement: [1, 3, 5, 7, 9]
      },
      stream: {
        dailyStreamCounts: {
          'Monday': 2,
          'Tuesday': 3,
          'Wednesday': 4,
          'Thursday': 2,
          'Friday': 5
        },
        hoursWatched: { value: 6400000, delta: 1200000, deltaPercentage: 22.1 },
        averageViewers: { value: 24300, delta: -6932, deltaPercentage: -19.1 }
      },
      _timestamp: Date.now(),
      _success: true
    }

    console.log('✅ Returning test data')
    return testData
    
  } catch (error) {
    console.error('❌ API Error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'API Error',
      message: error.message
    })
  }
})