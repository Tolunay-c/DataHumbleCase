<template lang="pug">
div(class="rounded-2xl")
  // Header
  div(class="flex justify-between items-center mb-6")
    h2(class="text-xl font-bold text-gray-800") Performance
    USelectMenu(
      v-model="selectedPeriod"
      :options="periodOptions"
      value-attribute="value"
      option-attribute="label"
      class="w-32"
      :disabled="loading"
    )
      template(#label)
        span(class="text-sm text-gray-600") {{ selectedPeriod.label }}
      template(#option="{ option }")
        span(class="text-sm") {{ option.label }}

  // Loading State
  div(class="flex items-center justify-center h-80" v-if="loading")
    div(class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500")

  // Error State  
  div(class="flex items-center justify-center h-80" v-else-if="!performanceData?.dates?.length")
    div(class="text-center")
      UIcon(name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-2")
      p(class="text-red-600") Grafik verisi bulunamadı

  // Chart
  div(class="w-[80%] mx-auto h-80" v-else-if="chartData")
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

// Props tanımla - API isteği yok!
const props = defineProps({
  performanceData: {
    type: Object,
    default: () => ({ dates: [], watchTime: [], engagement: [] })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

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

// Zaman formatı (saat)
const formatTime = (value) => {
  return `${value}h`
}

// Chart.js veri formatı - props'tan hesapla
const chartData = computed(() => {
  if (!props.performanceData?.dates?.length) return null
  
  const data = props.performanceData
  
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