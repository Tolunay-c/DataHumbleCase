<template lang="pug">
div(class="bg-[#F5F7FB] min-h-screen")
  // Desktop Layout (1024px ve üstü)
  div(class="hidden lg:block p-4")
    div(class="grid grid-cols-[11%_89%] min-h-screen")
      Sidebar
      div(class="flex flex-col")
        Topheader
        // Ana content - desktop için
        slot

  // Mobile Layout (1024px altı)
  div(class="lg:hidden")
    // Mobile Menu Component
    MobilMenu
    
    // Mobile Content Area
    div(class="p-4 pt-2")
      // Ana content - mobile için
      slot
</template>