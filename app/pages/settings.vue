<template lang="pug">
div(class="mt-4 px-8 flex flex-col gap-6 ")
  // Header Section
  div(class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4")
    div.flex.flex-col.gap-3
      h1(class="text-2xl lg:text-3xl font-bold font-poppins") Settings
      p(class="text-gray-500") Manage your account and application preferences

    div(class="flex flex-col sm:flex-row gap-2 lg:gap-3")
      UButton(
        icon="i-heroicons-arrow-path"
        variant="outline"
        color="gray"
        size="sm"
        @click="resetSettings"
        :loading="isResetting"
        class="w-full sm:w-auto"
      ) Reset
      UButton(
        icon="i-heroicons-check"
        size="sm"
        @click="saveSettings"
        :loading="isSaving"
        class="w-full sm:w-auto"
      ) Save Changes

  // Settings Categories - Responsive Grid
  div(class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4")
    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Profile
          p(class="text-xs text-gray-400") Personal information
        UIcon(name="i-heroicons-user" class="w-5 h-5 lg:w-6 lg:h-6 text-blue-500")

    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Security
          p(class="text-xs text-gray-400") Password & privacy
        UIcon(name="i-heroicons-shield-check" class="w-5 h-5 lg:w-6 lg:h-6 text-green-500")

    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Notifications
          p(class="text-xs text-gray-400") Email & push alerts
        UIcon(name="i-heroicons-bell" class="w-5 h-5 lg:w-6 lg:h-6 text-orange-500")

    div(class="bg-white p-3 lg:p-4 rounded-xl  shadow-sm")
      div(class="flex items-center justify-between")
        div
          p(class="text-xs lg:text-sm font-medium text-gray-600") Appearance
          p(class="text-xs text-gray-400") Theme & display
        UIcon(name="i-heroicons-paint-brush" class="w-5 h-5 lg:w-6 lg:h-6 text-purple-500")

  // Main Settings Content - Responsive Grid
  div(class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6")

    // Profile Settings
    div(class="bg-white rounded-xl  shadow-sm p-4 lg:p-6")
      h3(class="text-base lg:text-lg font-semibold text-gray-900 mb-4")
        UIcon(name="i-heroicons-user" class="w-4 h-4 lg:w-5 lg:h-5 inline mr-2")
        | Profile Settings

      div(class="flex flex-col gap-4")
        UFormGroup(label="Full Name")
          UInput(
            v-model="settings.fullName"
            placeholder="Enter your full name"
            icon="i-heroicons-user"
          )
        
        UFormGroup(label="Email Address")
          UInput(
            v-model="settings.email"
            type="email"
            placeholder="Enter your email"
            icon="i-heroicons-envelope"
          )
        
        UFormGroup(label="Phone Number")
          UInput(
            v-model="settings.phone"
            placeholder="Enter your phone"
            icon="i-heroicons-phone"
          )
        
        UFormGroup(label="Bio")
          UTextarea(
            v-model="settings.bio"
            placeholder="Tell us about yourself..."
            :rows="3"
          )

    // Security Settings
    div(class="bg-white rounded-xl  shadow-sm p-4 lg:p-6")
      h3(class="text-base lg:text-lg font-semibold text-gray-900 mb-4")
        UIcon(name="i-heroicons-shield-check" class="w-4 h-4 lg:w-5 lg:h-5 inline mr-2")
        | Security Settings

      div(class="flex flex-col gap-4")
        UFormGroup(label="Current Password")
          UInput(
            v-model="settings.currentPassword"
            type="password"
            placeholder="Enter current password"
            icon="i-heroicons-lock-closed"
          )
        
        UFormGroup(label="New Password")
          UInput(
            v-model="settings.newPassword"
            type="password"
            placeholder="Enter new password"
            icon="i-heroicons-key"
          )
        
        UFormGroup(label="Confirm Password")
          UInput(
            v-model="settings.confirmPassword"
            type="password"
            placeholder="Confirm new password"
            icon="i-heroicons-key"
          )
        
        div.flex.items-center.justify-between
          UFormGroup(label="Two-Factor Authentication")
            div.text-xs.text-gray-500 Enable 2FA for extra security
          UToggle(v-model="settings.twoFactorAuth")

    // Preferences Settings
    div(class="bg-white rounded-xl  shadow-sm p-4 lg:p-6")
      h3(class="text-base lg:text-lg font-semibold text-gray-900 mb-4")
        UIcon(name="i-heroicons-cog-6-tooth" class="w-4 h-4 lg:w-5 lg:h-5 inline mr-2")
        | Preferences

      div(class="flex flex-col gap-4")
        div(class="flex items-center justify-between")
          UFormGroup(label="Email Notifications")
            div.text-xs.text-gray-500 Receive email updates
          UToggle(v-model="settings.emailNotifications")
        
        div.flex.items-center.justify-between
          UFormGroup(label="Push Notifications")
            div.text-xs.text-gray-500 Browser push alerts
          UToggle(v-model="settings.pushNotifications")
        
        div.flex.items-center.justify-between
          UFormGroup(label="Dark Mode")
            div.text-xs.text-gray-500 Switch to dark theme
          UToggle(v-model="settings.darkMode")
        
        UFormGroup(label="Language")
          USelectMenu(
            v-model="settings.language"
            :options="languageOptions"
            placeholder="Select language"
          )
        
        UFormGroup(label="Timezone")
          USelectMenu(
            v-model="settings.timezone"
            :options="timezoneOptions"
            placeholder="Select timezone"
          )
        
        div.flex.items-center.justify-between
          UFormGroup(label="Auto-save")
            div.text-xs.text-gray-500 Automatically save changes
          UToggle(v-model="settings.autoSave")

  // Danger Zone
  div(class="bg-red-50 border border-red-200 rounded-xl p-4 lg:p-6")
    h3(class="text-base lg:text-lg font-semibold text-red-800 mb-2")
      UIcon(name="i-heroicons-exclamation-triangle" class="w-4 h-4 lg:w-5 lg:h-5 inline mr-2")
      | Danger Zone
    p(class="text-xs lg:text-sm text-red-600 mb-3 lg:mb-4") These actions cannot be undone. Please be careful.

    div(class="flex flex-col sm:flex-row gap-2 lg:gap-3")
      UButton(
        color="red"
        variant="outline"
        size="sm"
        @click="clearAllData"
        class="w-full sm:w-auto"
      ) Clear All Data
      UButton(
        color="red"
        size="sm"
        @click="deleteAccount"
        class="w-full sm:w-auto"
      ) Delete Account
</template>

<script setup>
// Reactive settings data
const settings = ref({
  // Profile
  fullName: 'Russel Anderson',
  email: 'russel@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Full-stack developer passionate about creating amazing user experiences.',
  
  // Security
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorAuth: false,
  
  // Preferences
  emailNotifications: true,
  pushNotifications: false,
  darkMode: false,
  language: 'en',
  timezone: 'UTC',
  autoSave: true
})

// Loading states
const isSaving = ref(false)
const isResetting = ref(false)

// Options
const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Türkçe', value: 'tr' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' }
]

const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'Europe/Istanbul', value: 'Europe/Istanbul' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' }
]

// Methods
const saveSettings = async () => {
  isSaving.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSaving.value = false
  
  const toast = useToast()
  toast.add({
    title: 'Settings saved!',
    description: 'Your settings have been updated successfully',
    icon: 'i-heroicons-check-circle',
    color: 'green'
  })
}

const resetSettings = async () => {
  isResetting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  settings.value = {
    ...settings.value,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    autoSave: true
  }
  
  isResetting.value = false
  
  const toast = useToast()
  toast.add({
    title: 'Settings reset',
    description: 'Settings have been reset to defaults',
    icon: 'i-heroicons-arrow-path'
  })
}

const clearAllData = () => {
  const toast = useToast()
  toast.add({
    title: 'Clear Data',
    description: 'This feature would clear all user data',
    icon: 'i-heroicons-trash',
    color: 'orange'
  })
}

const deleteAccount = () => {
  const toast = useToast()
  toast.add({
    title: 'Delete Account',
    description: 'This feature would delete the user account',
    icon: 'i-heroicons-x-circle',
    color: 'red'
  })
}

// Page meta
useHead({
  title: 'Settings - Dashboard'
})
</script>