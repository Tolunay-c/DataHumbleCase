<template lang="pug">
div(class="mt-4 px-8 flex flex-col gap-6")
  // Header Section
  div(class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4")
    div
      h1(class="text-2xl lg:text-3xl font-bold font-poppins") Inbox
      p(class="text-gray-500 mt-1") Manage your messages and notifications
    
    div(class="flex flex-col sm:flex-row gap-2 lg:gap-3")
      UButton(
        icon="i-heroicons-funnel"
        variant="outline"
        color="gray"
        size="sm"
        class="w-full sm:w-auto"
      ) Filter
      UButton(
        icon="i-heroicons-plus"
        size="sm"
        @click="openComposeModal"
        class="w-full sm:w-auto"
      ) New Message

  // Stats Cards - Responsive Grid
  div(class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4")
    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Total Messages
          p(class="text-xl lg:text-2xl font-bold text-gray-900") 0
        UIcon(name="i-heroicons-envelope" class="w-6 h-6 lg:w-8 lg:h-8 text-blue-500")
    
    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Unread
          p(class="text-xl lg:text-2xl font-bold text-orange-600") 0
        UIcon(name="i-heroicons-bell" class="w-6 h-6 lg:w-8 lg:h-8 text-orange-500")
    
    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Important
          p(class="text-xl lg:text-2xl font-bold text-red-600") 0
        UIcon(name="i-heroicons-star" class="w-6 h-6 lg:w-8 lg:h-8 text-red-500")
    
    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Archived
          p(class="text-xl lg:text-2xl font-bold text-green-600") 0
        UIcon(name="i-heroicons-archive-box" class="w-6 h-6 lg:w-8 lg:h-8 text-green-500")

  // Main Inbox Content
  div(class="bg-white rounded-xl  shadow-sm min-h-[400px] lg:min-h-[500px]")
    // Inbox Header - Responsive
    div(class="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 lg:p-6    gap-4")
      div(class="flex items-center gap-3 lg:gap-4 ")
        UCheckbox(v-model="selectAll" @change="toggleSelectAll")
        UDropdown(:items="actionItems" :popper="{ placement: 'bottom-start' }")
          UButton(
            icon="i-heroicons-chevron-down"
            variant="ghost"
            color="gray"
            size="sm"
            trailing
          ) Actions
      
      div(class="flex items-center gap-2")
        UInput(
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search messages..."
          class="flex-1 lg:w-64"
        )
        UButton(
          icon="i-heroicons-arrow-path"
          variant="ghost"
          color="gray"
          size="sm"
          @click="refreshInbox"
          :loading="isRefreshing"
        )
      
    div(class="border-t !border-gray-300 my-4")


    // Empty State
    div(class="flex flex-col items-center justify-center py-12 lg:py-20 px-4")
      div(class="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 lg:mb-6")
        UIcon(name="i-heroicons-inbox" class="w-10 h-10 lg:w-12 lg:h-12 text-gray-400")
      
      h3(class="text-lg lg:text-xl font-semibold text-gray-900 mb-2") Your inbox is empty
      p(class="text-gray-500 text-center text-sm lg:text-base max-w-sm lg:max-w-md mb-6 lg:mb-8")
        | You don't have any messages yet. When you receive new messages, they'll appear here.
      
      div(class="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full sm:w-auto")
        UButton(
          icon="i-heroicons-plus"
          @click="openComposeModal"
          class="w-full sm:w-auto"
        ) Compose Message
        UButton(
          variant="outline"
          icon="i-heroicons-arrow-path"
          @click="refreshInbox"
          :loading="isRefreshing"
          class="w-full sm:w-auto"
        ) Refresh
</template>

<script setup>
// Reactive data
const selectAll = ref(false)
const searchQuery = ref('')
const isRefreshing = ref(false)
const isComposeModalOpen = ref(false)
const isSending = ref(false)

// Compose form
const composeForm = ref({
  to: '',
  subject: '',
  message: ''
})

// Action items for dropdown
const actionItems = [
  [
    {
      label: 'Mark as Read',
      icon: 'i-heroicons-eye',
      click: () => markAsRead()
    },
    {
      label: 'Mark as Unread',
      icon: 'i-heroicons-eye-slash',
      click: () => markAsUnread()
    }
  ],
  [
    {
      label: 'Star',
      icon: 'i-heroicons-star',
      click: () => starMessages()
    },
    {
      label: 'Archive',
      icon: 'i-heroicons-archive-box',
      click: () => archiveMessages()
    }
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => deleteMessages()
    }
  ]
]

// Methods
const toggleSelectAll = () => {
  console.log('Toggle select all:', selectAll.value)
}

const refreshInbox = async () => {
  isRefreshing.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isRefreshing.value = false
  
  const toast = useToast()
  toast.add({
    title: 'Inbox refreshed',
    description: 'Your inbox is up to date',
    icon: 'i-heroicons-check-circle'
  })
}

const openComposeModal = () => {
  isComposeModalOpen.value = true
}

const closeComposeModal = () => {
  isComposeModalOpen.value = false
  composeForm.value = {
    to: '',
    subject: '',
    message: ''
  }
}

const sendMessage = async () => {
  isSending.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isSending.value = false
  closeComposeModal()
  
  const toast = useToast()
  toast.add({
    title: 'Message sent!',
    description: 'Your message has been sent successfully',
    icon: 'i-heroicons-check-circle',
    color: 'green'
  })
}

// Action methods
const markAsRead = () => {
  console.log('Mark as read')
}

const markAsUnread = () => {
  console.log('Mark as unread')
}

const starMessages = () => {
  console.log('Star messages')
}

const archiveMessages = () => {
  console.log('Archive messages')
}

const deleteMessages = () => {
  console.log('Delete messages')
}

// Page meta
useHead({
  title: 'Inbox - Dashboard'
})
</script>