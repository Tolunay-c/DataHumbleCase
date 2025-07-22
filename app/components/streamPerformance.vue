<template lang="pug">

div.flex.flex-col.gap-3
 div(class="border-[#E6E6E6] ps-3").border-s
  h2.text-xl.font-semibold.font-poppins Stream Performance
 div(class="bg-[#F5F7FB]").p-6.rounded-2xl
  // Loading State
  div.flex.items-center.justify-center.h-60(v-if="pending")
    div.animate-spin.rounded-full.h-8.w-8.border-b-2.border-blue-500

  // Error State  
  div.flex.items-center.justify-center.h-60(v-else-if="error")
    div.text-center
      UIcon(name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-2")
      p.text-red-600 Stream verileri yüklenirken hata oluştu

  // Chart
  div.h-60(v-else-if="chartData")
    Bar(
      :data="chartData"
      :options="chartOptions"
    )
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Chart.js kayıt
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// API'den veri çekme
const { data: streamData, pending, error } = await useFetch(
  'https://dhcase-mockapi.vercel.app/api/game/578080/stream',
  {
    key: 'stream-performance',
    default: () => ({ dailyStreamCounts: {} }),
    server: false
  }
)

// Gün isimlerini kısaltma
const dayAbbreviations = {
  'Monday': 'Mon',
  'Tuesday': 'Tue', 
  'Wednesday': 'Wed',
  'Thursday': 'Thu',
  'Friday': 'Fri',
  'Saturday': 'Sat',
  'Sunday': 'Sun'
}

// Chart.js veri formatı
const chartData = computed(() => {
  if (!streamData.value?.dailyStreamCounts) return null
  
  const dailyCounts = streamData.value.dailyStreamCounts
  
  // Günleri sırala (Pazartesi'den Cuma'ya)
  const orderedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  
  const labels = orderedDays
    .filter(day => dailyCounts[day] !== undefined)
    .map(day => dayAbbreviations[day])
  
  const data = orderedDays
    .filter(day => dailyCounts[day] !== undefined)
    .map(day => dailyCounts[day])
  
  return {
    labels,
    datasets: [
      {
        label: 'Stream Count',
        data: data,
        backgroundColor: '#3B82F6', // Blue
        borderColor: '#2563EB',
        borderWidth: 0,
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomLeft: 0,
          bottomRight: 0
        },
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }
    ]
  }
})

// Chart seçenekleri
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Legend gizli
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function(context) {
          return `${context.parsed.y} stream${context.parsed.y !== 1 ? 's' : ''}`
        },
        title: function(context) {
          return context[0].label
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      border: {
        display: false
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 12,
          weight: '500'
        }
      }
    },
    y: {
      beginAtZero: true,
      max: 5, // 0-5 arası göster
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      border: {
        display: false
      },
      ticks: {
        stepSize: 1,
        color: '#9CA3AF',
        font: {
          size: 11
        },
        callback: function(value) {
          return Number.isInteger(value) ? value : ''
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart'
  }
}))
</script>