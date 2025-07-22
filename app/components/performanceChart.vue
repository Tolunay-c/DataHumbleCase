<template lang="pug">
div.rounded-2xl
  // Header
  div.flex.justify-between.items-center.mb-6
    h2.text-xl.font-bold.text-gray-800 Performance
    USelectMenu(
      v-model="selectedPeriod"
      :options="periodOptions"
      value-attribute="value"
      option-attribute="label"
      class="w-32"
    )
      template(#label)
        span.text-sm.text-gray-600 {{ selectedPeriod.label }}
      template(#option="{ option }")
        span.text-sm {{ option.label }}

  // Loading State
  div.flex.items-center.justify-center.h-80(v-if="pending")
    div.animate-spin.rounded-full.h-8.w-8.border-b-2.border-blue-500

  // Error State  
  div.flex.items-center.justify-center.h-80(v-else-if="error")
    div.text-center
      UIcon(name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-2")
      p.text-red-600 Grafik yüklenirken hata oluştu

  // Chart
  div(class="w-[80%] mx-auto ").h-80(v-else-if="chartData")
    Line(
      :data="chartData"
      :options="chartOptions"
    )
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Chart.js kayıt
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Period seçenekleri
const periodOptions = [
  { value: '7d', label: '01 - 07 May' },
  { value: '30d', label: '01 - 30 May' },
  { value: '90d', label: '01 Apr - 30 Jun' },
  { value: '1y', label: 'Last Year' }
]

// Reaktif period seçimi
const selectedPeriod = ref(periodOptions[0])

// API'den veri çekme - period değiştiğinde otomatik yenilenir
const { data: performanceData, pending, error } = await useFetch(
  'https://dhcase-mockapi.vercel.app/api/game/578080/performance',
  {
    key: 'performance-data',
    query: {
      period: computed(() => selectedPeriod.value.value)
    },
    default: () => ({ dates: [], watchTime: [], engagement: [] }),
    server: false, // Client-side için
    watch: [selectedPeriod] // Period değişince yeniden çek
  }
)

// Zaman formatı (saat)
const formatTime = (value) => {
  if (value >= 12) {
    return `${value}h`
  } else {
    return `${value}h`
  }
}

// Chart.js veri formatı
const chartData = computed(() => {
  if (!performanceData.value?.dates?.length) return null
  
  const data = performanceData.value
  
  // X ekseni etiketleri - tarihlerden gün çıkar (01, 02, 03...)
  const labels = data.dates.map(date => {
    const day = new Date(date).getDate()
    return String(day).padStart(2, '0')
  })
  
  return {
    labels,
    datasets: [
      {
        label: 'Watch Time',
        data: data.watchTime,
        borderColor: '#3B82F6', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      },
      {
        label: 'Engagement', 
        data: data.engagement,
        borderColor: '#F97316', // Orange
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#F97316',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }
    ]
  }
})

// Chart seçenekleri
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index'
  },
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
      displayColors: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${formatTime(context.parsed.y)}`
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
        color: '#9CA3AF',
        font: {
          size: 12
        }
      }
    },
    y: {
      beginAtZero: true,
      max: 12,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      border: {
        display: false
      },
      ticks: {
        stepSize: 2,
        color: '#9CA3AF',
        font: {
          size: 12
        },
        callback: function(value) {
          return formatTime(value)
        }
      }
    }
  },
  elements: {
    line: {
      borderWidth: 2
    }
  }
}))
</script>