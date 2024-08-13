<script lang="ts" setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'

const canvas = ref<HTMLCanvasElement | null>(null)
const text = ref(`大胆去做, 不要怕,
没有人在乎,
就算有人在乎,
人又算什么东西。`)
const text2 = ref(`Be bold and don't be afraid. No one cares, even if someone cares, people are nothing.`)
const text3 = ref(`/威廉·萨默塞特·毛姆`)
// use html2canvas to generate a screenshot
const generateScreenshot = () => {
  if (canvas.value) {
    html2canvas(canvas.value).then(canvas => {
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL('image/png')

      // Create a link element and trigger download
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'screenshot.png'
      link.click()
    })
  }
}

</script>

<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-col justify-center p-4">
      <textarea class="border-2 border-gray-300 rounded-md p-2 w-full mb-4" rows="5" v-model="text"></textarea>
      <textarea class="border-2 border-gray-300 rounded-md p-2 w-full mb-4" rows="5" v-model="text2"></textarea>
      <textarea class="border-2 border-gray-300 rounded-md p-2 w-full mb-4" rows="5" v-model="text3"></textarea>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md" @click="generateScreenshot">
        下载图片
      </button>
    </div>
    <div class="flex flex-col justify-center items-center h-screen">
      <div ref="canvas" class="w-[360px] bg-gray-200 text-green-700 p-4 font-mingchao">
        <p v-for="(line, index) in text.split('\n')" :key="index" class="mb-2 text-3xl">{{ line }}</p>
        <p v-for="(line, index) in text2.split('\n')" :key="index" class="mb-2">{{ line }}</p>
        <p v-for="(line, index) in text3.split('\n')" :key="index" class="mt-10 text-sm">{{ line }}</p>
      </div>
    </div>
  </div>
</template>