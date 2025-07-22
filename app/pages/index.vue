<template lang="pug">
div(class="grid grid-cols-1 2xl:grid-cols-[65%_35%] gap-4 lg:gap-8 2xl:gap-0")
  // Left Column - Main Content
  div(class="pt-4 lg:pt-[32px] flex flex-col px-0 lg:px-8")
    CardBox
    div(class="mt-6 px-4 lg:px-8 py-6 lg:py-10 bg-white rounded-2xl flex flex-col gap-5")
      PerformanceChart
      div(class="py-4 lg:py-8")
        DescriptionText(
          title="Description"
        )
  
  // Right Column - Side Content
  div(class="mt-4 lg:ml-8 lg:mr-8 2xl:ml-0 2xl:mr-0 2xl:mt-8 px-4 lg:px-[22px] py-4 lg:py-[22px] bg-white flex flex-col gap-4 lg:gap-5 2xl:gap-0 justify-between rounded-2xl")
    DescriptionText(
      title="Short Description"
      content-class="bg-white"
    )
    StreamPerformance
    StreamStats
</template>